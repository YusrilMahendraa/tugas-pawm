import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import firebaseApp from "../../lib/firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);

  const getValue = async () => {
    const database = getDatabase(firebaseApp);
    const rootReference = ref(database);

    try {
      const dbGet = await get(child(rootReference, "users"));
      const dbValue = dbGet.val();
      console.log(dbValue);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase(firebaseApp);
      const userRef = ref(db, "users/" + username);
      await set(userRef, {
        username,
        password,
        progress,
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-header">
          <h1>Register</h1>
        </div>
        <div className="register-body">
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button className="register-button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
