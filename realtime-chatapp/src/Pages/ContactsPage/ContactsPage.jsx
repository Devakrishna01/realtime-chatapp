import "./ContactsPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [filtercontacts, setFilterContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [addContact, setAddContact] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const savedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  const userId = savedUser?.id;
  async function fetchContacts() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/contacts/${userId}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setContacts(data.contacts);
    } catch (error) {
      console.log(error.message);
    }
  }
  function handlefiltercontacts(searchValue) {
    setFilterContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }

  function add2Contact() {
    setContacts((previouscontacts) => [
      ...previouscontacts,
      {
        id: previouscontacts.length + 1,
        name,
        status,
      },
    ]);
    setName("");
    setStatus("");
    setAddContact(false);
  }

  async function deleteContact(contactUserId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/contacts/${userId}/${contactUserId}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to delete contact");
      }
      await fetchContacts();
      console.log("Contact deleted successfully");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchContacts();
    }
  }, [userId]);
  return (
    <section className="contactspage">
      <div className="contactspage-header">
        <Link className="back-button" to={"/chat-dashboard"}>
          ← Back{" "}
        </Link>
        <h1>👥 Contacts</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handlefiltercontacts(e.target.value);
          }}
        ></input>
      </div>
      <div className="contacts">
        {(searchText === "" ? contacts : filtercontacts).map((contact) => (
          <div className="contactid" key={contact.id}>
            <div className="contact-card">
              <p> 👤 {contact.name}</p>
              <p>{contact.status}</p>
              <Link className="contact-card-chat" to={"/chat-conversation"}>
                💬 Chat
              </Link>
              <button
                className="del-button"
                onClick={() => {
                  if (contact.contactUser?._id) {
                    deleteContact(contact.contactUser._id);
                  } else {
                    console.log("Contact user data is missing:", contact);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-button">
        <button className="outaddbutton" onClick={() => setAddContact(true)}>
          ➕ Add Contact
        </button>
        {addContact && (
          <div className="add-button-progress">
            <input
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="entername"
            />
            <select
              className="statusbutton"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <button className="insideaddbutton" onClick={add2Contact}>
              Add to contact
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
