import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      await API.post("/auth/signup", form);
      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#005461" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h3 className="text-center mb-3" style={{ color: "#005461" }}>
          Create Account 🚀
        </h3>

        <p className="text-center text-muted mb-4">
          Sign up to start chatting
        </p>

        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

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
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-center">
          <small>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#CF4B00", fontWeight: "600" }}>
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

