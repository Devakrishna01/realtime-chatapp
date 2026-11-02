const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    contactUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate contacts for the same user
contactSchema.index({ owner: 1, contactUser: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);
