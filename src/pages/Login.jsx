
import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/chat");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#005461" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3" style={{ color: "#005461" }}>
          Welcome Back 👋
        </h3>

        <p className="text-center text-muted mb-4">
          Login to continue your conversations
        </p>

        <input
          className="form-control mb-3"
          placeholder="Email address"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="btn w-100 mb-3"
          style={{ backgroundColor: "#CF4B00", color: "#fff" }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#CF4B00", fontWeight: "600" }}>
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
