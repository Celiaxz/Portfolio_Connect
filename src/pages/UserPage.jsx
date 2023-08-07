import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { useContext } from "react";

function UserPage() {
    const token = localStorage.getItem("authToken");
    const {user, isLoading, isLoggedIn} = useContext(AuthContext)
    console.log(isLoggedIn)

    return (
        <>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <h1>Welcome {user ? user.username : null}</h1>
        )
        }
        </>
    )
}

export default UserPage;