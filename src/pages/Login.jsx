import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const currentUser = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        currentUser
      );
      if (response.status === 202) {
        //if logged in successfully, store the token on local storage
        localStorage.setItem("authToken", response.data.token);
        //navigate to home for now, we'll see later where to redirect
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Login;
