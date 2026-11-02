const Contact = require("./models/Contact");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Message = require("./models/Message");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.post("/api/messages", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Validate the input
    if (!sender || !receiver || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create a new message
    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    // Save message in MongoDB
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/api/messages/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user in MongoDB
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "login-failed",
    });
  }
});
// GET USER PROFILE
app.get("/api/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
});

// UPDATE USER PROFILE
app.put("/api/profile/:id", async (req, res) => {
  try {
    const { name, email, status } = req.body;

    if (!name || !email || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!["online", "offline"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Check whether another user already uses this email
    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.params.id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        email: normalizedEmail,
        status: status,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
});

app.get("/api/contacts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const contacts = await Contact.find({
      owner: userId,
    })
      .populate("contactUser", "name email status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
    });
  }
});

app.get("/api/users/search", async (req, res) => {
  try {
    const { query, userId } = req.query;

    // Check required values
    if (!query || !userId) {
      return res.status(400).json({
        success: false,
        message: "Search query and user ID are required",
      });
    }

    // Validate MongoDB user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Escape special regular expression characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Find matching registered users
    const users = await User.find({
      _id: { $ne: userId },
      $or: [
        { name: { $regex: escapedQuery, $options: "i" } },
        { email: { $regex: escapedQuery, $options: "i" } },
      ],
    }).select("name email status");

    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error("User search error:", error);

    res.status(500).json({
      success: false,
      message: "Error searching users",
    });
  }
});

app.delete("/api/contacts/:userId/:contactUserId", async (req, res) => {
  try {
    const { userId, contactUserId } = req.params;

    const deletedContact = await Contact.findOneAndDelete({
      owner: userId,
      contactUser: contactUserId,
    });

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
    });
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const { userId, contactUserId } = req.body;

    // Check required fields
    if (!userId || !contactUserId) {
      return res.status(400).json({
        success: false,
        message: "User IDs are required",
      });
    }

    // Validate MongoDB IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(contactUserId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Prevent adding yourself
    if (userId === contactUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself",
      });
    }

    // Check whether both users exist
    const owner = await User.findById(userId);
    const contactUser = await User.findById(contactUserId);

    if (!owner || !contactUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check whether contact already exists
    const existingContact = await Contact.findOne({
      owner: userId,
      contactUser: contactUserId,
    });

    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: "Contact already exists",
      });
    }

    // Save contact in MongoDB
    const newContact = await Contact.create({
      owner: userId,
      contactUser: contactUserId,
    });

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Add contact error:", error);

    res.status(500).json({
      success: false,
      message: "Error adding contact",
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
