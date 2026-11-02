import { Link } from "react-router-dom";
import "./LogoutPage.css";
export function LogoutPage() {
  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
  }
  return (
    <section className="logout-page">
      <div className="header">Logout</div>
      <div className="logout-body">
        <p> Are you sure you want to logout? </p>
        <div className="buttonsall">
          <Link className="cancel" to={"/chat-dashboard"}>
            Cancel
          </Link>
          <Link className="logout" to={"/login"} onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </section>
  );
}
