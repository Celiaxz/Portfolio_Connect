import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
function UserPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
      }
    }
    fetchUser();
  }, [id]);
  return (
    <>
      {!wantedUser ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to {wantedUser.username}'s page</h1>

          <button
            className={id !== user._id ? "hidden" : null}
            onClick={() => navigate(`/user/update`)}
          >
            'Update Profile
          </button>

          <Link to={`/my-projects/${id}`}>My Projects</Link>
        </>
      )}
    </>
  );
}
export default UserPage;
