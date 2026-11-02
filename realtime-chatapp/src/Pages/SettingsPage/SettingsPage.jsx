import { Link } from "react-router-dom";
import "./SettingsPage.css";
import { useState } from "react";
export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: false,
    messageSound: false,
    darkMode: false,
    privacy: "everyone",
  });
  const [saved, setSaved] = useState(false);
  const [pri, setPri] = useState(false);
  function handleNotifications() {
    setSettings((previousSettings) => ({
      ...previousSettings,
      notifications: !previousSettings.notifications,
    }));
  }
  function handleMessage() {
    setSettings((previousSettings) => ({
      ...previousSettings,
      messageSound: !previousSettings.messageSound,
    }));
  }
  function handleAppearance() {
    setSettings((previousSettings) => ({
      ...previousSettings,
      darkMode: !previousSettings.darkMode,
    }));
  }

  return (
    <section className="settings-page">
      <div className="header">
        <Link to={"/chat-dashboard"} className="backbutton">
          ← Back
        </Link>
        <p>⚙ Settings</p>
      </div>
      <div className="settings-body">
        <div className="account">
          <div className="profile">
            <Link to={"/profile"} className="profile-id">
              👤 Profile{" "}
            </Link>
          </div>
        </div>
        <div className="notifications">
          <button onClick={handleNotifications}>🔔 Notifications </button>
          <div className="onoroff">
            {settings.notifications === true ? "ON" : "OFF"}
          </div>

          <button onClick={handleMessage}> 🔊 Message Sound</button>
          <div className="onoroff">
            {settings.messageSound === true ? "ON" : "OFF"}
          </div>
        </div>
        <div className="appearance">
          <button onClick={handleAppearance}> Use dark theme </button>
          <div className="onoroff">
            {settings.darkMode === true ? "ON" : "OFF"}
          </div>
        </div>
        <div className="privacy">
          <button onClick={() => setPri(!pri)}>🔒 Privacy</button>
          {pri && (
            <select
              className="privacybox"
              value={settings.privacy}
              onChange={(e) =>
                setSettings((previousSettings) => ({
                  ...previousSettings,
                  privacy: e.target.value,
                }))
              }
            >
              <option value="everyone">Everyone</option>
              <option value="contacts">Contacts</option>
              <option value="nobody">Nobody</option>
            </select>
          )}

          <div className="onoroff">{settings.privacy}</div>
        </div>
        <button className="savesettings" onClick={() => setSaved(!saved)}>
          Save Settings
        </button>
        <div className="onoroff">{saved && <p>saved successfully</p>}</div>
      </div>
    </section>
  );
}
