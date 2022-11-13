import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/register";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          data && window.location.replace("/login");
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your username ..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Your Email ..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton">Register</button>
      </form>
      <Link className="link" to="/login">
        <button className="registerLoginButton">Login</button>
      </Link>
    </div>
  );
}

export default Register;
