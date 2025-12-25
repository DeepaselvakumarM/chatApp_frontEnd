/**
 
 Displays application name and logged-in user details.
  Shows user email with a logout option.
 Handles logout by clearing session data and redirecting to login page.
 */


import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  // If not logged in don't show header
  if (!user) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 shadow-sm"
      style={{ backgroundColor: "#005461" }}
    >
      <span
        className="navbar-brand fw-bold"
        style={{ color: "#fff", fontSize: "20px" }}
      >
        💬 Chat App
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">
        <div className="text-end text-white">
          <div className="fw-semibold">{user.username}</div>
          <small style={{ opacity: 0.85 }}>{user.email}</small>
        </div>

        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "#CF4B00",
            color: "#fff",
            borderRadius: "20px",
            padding: "6px 14px"
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
