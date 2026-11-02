import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    status: "online",
  });

  const [editprofile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get logged-in user from sessionStorage
  const savedUser = JSON.parse(sessionStorage.getItem("user") || "null");

  const userId = savedUser?.id;

  // GET PROFILE FROM MONGODB
  useEffect(() => {
    async function fetchProfile() {
      if (!sessionStorage.getItem("isLoggedIn") || !userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${userId}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch profile");
        }

        setProfile({
          name: data.user.name,
          email: data.user.email,
          status: data.user.status,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId, navigate]);

  // HANDLE INPUT CHANGES
  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  }

  // UPDATE PROFILE IN MONGODB
  async function handleSave() {
    setError("");
    setSuccess("");

    if (!profile.name.trim() || !profile.email.trim()) {
      setError("Name and email are required");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      setProfile({
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
      });

      // Update the user information stored in sessionStorage
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        }),
      );

      setEditProfile(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="profilepage">
      <div className="profile-page-header">
        <Link to="/chat-dashboard" className="back-button">
          ← Back
        </Link>

        <p>👤 My Profile</p>
      </div>

      <div className="profile-page-body">
        <div className="name">
          <p>👤 Name</p>
          <p>{profile.name}</p>
        </div>

        <div className="email">
          <p>✉️ Email</p>
          <p>{profile.email}</p>
        </div>

        <div className="status">
          <p>🟢 Status</p>
          <p>{profile.status}</p>
        </div>
      </div>

      <div className="profile-page-edit">
        {error && <p className="error-message">{error}</p>}

        {success && <p className="success-message">{success}</p>}

        <button
          className="edit-button"
          onClick={() => {
            setError("");
            setSuccess("");
            setEditProfile(true);
          }}
        >
          ✏️ Edit Profile
        </button>

        {editprofile && (
          <div className="edit-profile-form">
            <input
              type="text"
              name="name"
              placeholder="Edit name"
              value={profile.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Edit email"
              value={profile.email}
              onChange={handleChange}
            />

            <select
              name="status"
              value={profile.status}
              onChange={handleChange}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setEditProfile(false);
                setError("");
                setSuccess("");
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
