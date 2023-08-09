import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
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

  if(user && wantedUser) {
    return (
      <>
          <div className="profile-container">
            <h1>Welcome to {wantedUser.username}'s page</h1>
            <img style={{maxHeight: '200px', maxWidth: '200px', borderRadius: '50%'}} src={wantedUser.image} alt="profile image" />
            <ul style={{listStyle: 'none'}}>
              Skills:
              {
                wantedUser.skills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })
              }
            </ul>
            <p>{wantedUser.aboutMe}</p>
  
            <button
              className={id !== user._id ? "hidden" : null}
              onClick={() => navigate(`/user/update`)}
            >
              Update Profile
            </button>
  
            <Link to={`/user/${id}/projects`}>Projects</Link>
          </div>
      </>
    )
  } else {
    return <h2>...Loading</h2>
  }
}
export default UserPage;
