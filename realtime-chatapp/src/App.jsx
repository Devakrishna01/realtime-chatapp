import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatDashboard } from "./Pages/ChatDashboard/ChatDashboard";
import { UserSearchPage } from "./Pages/UserSearch/UserSearchPage";
import { ChatConversation } from "./Pages/ChatConversation/ChatConversation";
import { ContactsPage } from "./Pages/ContactsPage/ContactsPage";
import { Registration } from "./Pages/Registration/Registration";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { NotificationsPage } from "./Pages/NotificationsPage/NotificationsPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import { LogoutPage } from "./Pages/LogoutPage/LogoutPage";
import { GroupChatPage } from "./Pages/GroupChatPage/GroupChatPage";
import { GroupDetails } from "./Pages/GroupDetails/GroupDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat-dashboard" element={<ChatDashboard />} />
        <Route path="/user-search" element={<UserSearchPage />} />
        <Route path="/chat-conversation" element={<ChatConversation />} />
        <Route path="/contacts-page" element={<ContactsPage />} />
        <Route path="/register-page" element={<Registration />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/group-chat" element={<GroupChatPage />} />
        <Route path="/group-details" element={<GroupDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
