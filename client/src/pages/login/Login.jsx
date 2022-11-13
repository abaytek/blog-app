import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { dispatch } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const url = "http://localhost:5000/api/auth/login";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      };
      await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.username) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
          } else {
            setError(true);
            setErrorText(data);
          }
        });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your useraname ..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
      </form>
      {error && <span className="error">{errorText}</span>}
      <Link className="link" to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}

export default Login;
