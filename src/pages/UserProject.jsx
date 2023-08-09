import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";

function UserProject() {
  const { id } = useParams();
  const { isLoading, user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
        setProjects(parsed.projects);
      }
    }
    fetchUser();
    console.log(wantedUser);
  }, []);

  const updateProjectHandler = (projectId) => {
    navigate(`/projects/${projectId}/update`);
  };

  const deleteProjectHandler = async (projectId) => {
    try {
      const response = await fetch(`${BASE_URL}/project/delete/${projectId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Project was deleted successfully, remove it from the state
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      } else {
        console.log("Failed to delete the project");
      }
    } catch (error) {
      console.log("Error while deleting the project:", error);
    }
  };

  const redirectToProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if(user && wantedUser){
    return (
          <>
            <h1>Welcome to {wantedUser ? wantedUser.username : null}'s page</h1>
            <h2>Projects</h2>
            {projects.map((project) => (
              <div key={project._id} className="projects-list">
                <p>
                  <Link to={`/projects/${project._id}`}>{project.title}</Link>
                </p>
                <p>{project.technologies}</p>
                <p>{project.repositoryLink}</p>
                <p>{project.projectFolder}</p>
                <button onClick={() => redirectToProject(project._id)}>
                  See more
                </button>
                <button
                  className={id !== user._id ? "hidden" : null}
                  type="submit"
                  onClick={() => updateProjectHandler(project._id)}
                >
                  Edit
                </button>
                <button
                  className={id !== user._id ? "hidden" : null}
                  type="submit"
                  onClick={() => deleteProjectHandler(project._id)}
                >
                  delete
                </button>
              </div>
            ))}
          </>
    );
  } else {
    return <h2>...Loading</h2>
  }
}
export default UserProject;
