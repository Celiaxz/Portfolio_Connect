import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    //user will be an object {user_id, username, email}
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authenticateUser = async () => {
        //grab the token that was previously stored and named "authToken" in login component
        const tokenInStorage = localStorage.getItem("authToken")
        setIsLoading(false)
        //when login successed, there's a token, else not
        if (tokenInStorage) {
            try {
                //check if the token format is valid "Bearer blabla" with the backend middleware
                const response = await axios.get("http://localhost:5005/auth/verify", {
                    headers: {
                        authorization: `Bearer ${tokenInStorage}`
                    }
                })
                //if it's all good, the response.data is token status + the currentUser
                console.log("the token status is", response.data);
                setIsLoggedIn(true)
                setUser(response.data.currentUser)
            } catch (error) {
                console.error(error)
                setIsLoggedIn(false)
                setUser(null)
            }
        } else {
            setIsLoggedIn(false)
            setUser(null)
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, isLoggedIn, setIsLoggedIn }
        }>
            {children}
        </AuthContext.Provider >
    )

}

export { AuthContext, AuthContextWrapper };