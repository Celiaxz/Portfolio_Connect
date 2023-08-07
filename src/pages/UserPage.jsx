import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";

import { Link, useParams } from "react-router-dom";
function UserPage() {
  const { id } = useParams();
  const { isLoading } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:5005/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
        setProjects(parsed.projects);
      }
    }
    fetchUser();
    console.log(wantedUser);
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to {wantedUser ? wantedUser.username : null}'s page</h1>
          <h2>Projects</h2>
          <Link to={`/my-projects/${id}`}>My Projects</Link>
          {/* {projects.map((project) => (
            <div key={project._id} className="projects-list">
              <p>{project.title}</p>
              <p>{project.technologies}</p>
              <p>{project.repositoryLink}</p>
              <p>{project.projectFolder}</p>
            </div>
          ))} */}
        </>
      )}
    </>
  );
}
export default UserPage;
