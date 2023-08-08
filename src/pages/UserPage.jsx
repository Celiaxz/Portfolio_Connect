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
      const response = await fetch(`http://localhost:5005/user/${id}`);
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
        <div className="profile-container">
          <h1>Welcome to {wantedUser.username}'s page</h1>
          <Link to={`/my-projects/${id}`}>Projects</Link>
          <img style={{maxHeight: '200px', maxWidth: '200px', borderRadius: '50%'}} src={wantedUser.image} alt="profile image" />
          <ul style={{listStyle: 'none'}}>
            Skills:
            {
              user.skills.map((skill, index) => {
                return <li key={index}>{skill}</li>
              })
            }
          </ul>
          <p>{user.aboutMe}</p>

          <button className={id !== user._id ? "hidden" : null} onClick={() => navigate(`/user/update`)}>Update Profile</button>
          
        </div>
      )}
    </>
  );
}
export default UserPage;
