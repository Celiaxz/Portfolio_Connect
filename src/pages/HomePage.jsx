import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";


function HomePage() {
    const { user, isLoading } = useContext(AuthContext);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Welcome to HomePage {user ? user.username : null}!</h1>
                </>
            )}
        </>
    );
}

export default HomePage;
