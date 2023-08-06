import { useParams } from "react-router-dom";

function UserPage() {
    const {userId} = useParams()
    const token = localStorage.getItem("authToken");
    console.log(token)

    return (
        <>
            <h1>Welcome {userId}</h1>
        </>
    )
}

export default UserPage;