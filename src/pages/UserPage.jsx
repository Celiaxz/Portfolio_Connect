import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
function UserPage() {
  const { id } = useParams();
  const { isLoading, user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:5005/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      {!wantedUser ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to {wantedUser.username}'s page</h1>

          <button onClick={() => navigate(`/user/update`)}>{id === user._id ? 'Update Profile' : null}</button>

          <Link to={`/my-projects/${id}`}>My Projects</Link>
          
        </>
      )}
    </>
  );
}
export default UserPage;
