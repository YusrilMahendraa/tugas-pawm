import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import firebaseApp from "../../lib/firebase";
import { getDatabase, ref, get } from "firebase/database";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase(firebaseApp);
      const userRef = ref(db, "users/" + username);
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      console.log("userData:", userData);
      if (userData) {
        if (userData.username === username && userData.password === password) {
          alert("Login successful");
          navigate("/", { state: { userData } });
        } else {
          alert("Invalid username or password");
        }
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className="login-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span
              onClick={handleRegisterClick}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
