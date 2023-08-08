import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  //user will be an object {user_id, username, email}
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      if (response.status === 202) {
        //if logged in successfully, store the token on local storage
        localStorage.setItem("authToken", response.data.token);
        setIsLoggedIn(true);
        setUser(response.data.currentUser);
        //navigate to home for now, we'll see later where to redirect
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.errorMessage);
    }
  };

  const authenticateUser = async () => {
    //grab the token that was previously stored and named "authToken" in login component
    const tokenInStorage = localStorage.getItem("authToken");
    setIsLoading(false);
    //when login successed, there's a token, else not
    if (tokenInStorage) {
      try {
        //check if the token format is valid "Bearer blabla" with the backend middleware
        const response = await axios.get(`${BASE_URL}/auth/verify`, {
          headers: {
            authorization: `Bearer ${tokenInStorage}`,
          },
        });
        //if it's all good, the response.data is token status + the currentUser
        setIsLoggedIn(true);
        setUser(response.data.currentUser);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        handleLogout,
        handleLogin,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
