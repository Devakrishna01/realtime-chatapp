import { Link } from "react-router-dom";
import { useState } from "react";
import "./GroupDetails.css";

export function GroupDetails() {
  const [group, setGroup] = useState({
    id: 1,
    name: "CSE Friends",
    members: [
      {
        id: 1,
        name: "Deva",
        role: "admin",
        status: "online",
      },
      {
        id: 2,
        name: "Arun",
        role: "member",
        status: "online",
      },
      {
        id: 3,
        name: "Priya",
        role: "member",
        status: "online",
      },
      {
        id: 4,
        name: "Rahul",
        role: "member",
        status: "offline",
      },
      {
        id: 5,
        name: "Karthik",
        role: "member",
        status: "online",
      },
    ],
  });

  const [editName, setEditName] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [saved, setSaved] = useState(false);

  function deleteMember(memberId) {
    setGroup((previousGroup) => ({
      ...previousGroup,
      members: previousGroup.members.filter((member) => member.id !== memberId),
    }));
  }

  function addNewMember() {
    if (newMemberName.trim() === "") {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: newMemberName,
      role: "member",
      status: "online",
    };

    setGroup((previousGroup) => ({
      ...previousGroup,
      members: [...previousGroup.members, newMember],
    }));

    setNewMemberName("");
    setAddMember(false);
  }

  function handleSave() {
    setSaved(true);
  }

  function leaveGroup() {
    alert("You have left the group.");
  }

  return (
    <section className="group-details">
      {/* Header */}
      <div className="group-details-header">
        <Link to="/group-chat">← Back</Link>
        <h1>⚙️ Group Details</h1>
      </div>

      {/* Group Information */}
      <div className="group-information">
        <p className="group-icon">👥</p>

        <h2>{group.name}</h2>

        <p>{group.members.length} members</p>

        <button className="edit-name-button" onClick={() => setEditName(true)}>
          ✏️ Edit Name
        </button>

        {editName && (
          <div className="edit-name-section">
            <input
              type="text"
              value={group.name}
              onChange={(e) =>
                setGroup((previousGroup) => ({
                  ...previousGroup,
                  name: e.target.value,
                }))
              }
            />

            <button onClick={() => setEditName(false)}>Save Name</button>
          </div>
        )}
      </div>

      {/* Members */}
      <div className="members-section">
        <h2>Members</h2>

        <div className="members-list">
          {group.members.map((member) => (
            <div className="member-card" key={member.id}>
              <div className="member-information">
                <p>👤 {member.name}</p>
                <p className="member-status">{member.status}</p>
              </div>

              <div className="member-actions">
                <p>{member.role}</p>

                {member.id !== 1 && (
                  <button onClick={() => deleteMember(member.id)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member */}
      <div className="add-member-section">
        <button
          className="add-member-button"
          onClick={() => setAddMember(!addMember)}
        >
          ➕ Add Member
        </button>

        {addMember && (
          <div className="add-member-form">
            <input
              type="text"
              placeholder="Enter member name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
            />

            <button onClick={addNewMember}>Add</button>
          </div>
        )}
      </div>

      {/* Save */}
      <button className="save-group-button" onClick={handleSave}>
        Save Changes
      </button>

      {saved && <p className="saved-message">Changes saved successfully</p>}

      {/* Leave Group */}
      <button className="leave-group-button" onClick={leaveGroup}>
        🚪 Leave Group
      </button>
    </section>
  );
}
