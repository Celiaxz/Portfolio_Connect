import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function UserProject() {
  const { id } = useParams();
  const { isLoading } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
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

  const updateProjectHandler = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const deleteProjectHandler = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5005/project/delete/${projectId}`,
        {
          method: "DELETE",
        }
      );

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
    navigate(`/projects/${projectId}`)
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to {wantedUser ? wantedUser.username : null}'s page</h1>
          <h2>Projects</h2>
          {projects.map((project) => (
            <div key={project._id} className="projects-list">
              <p><Link to={`/projects/${project._id}`}>{project.title}</Link></p>
              <p>{project.technologies}</p>
              <p>{project.repositoryLink}</p>
              <p>{project.projectFolder}</p>
              <button onClick={() => redirectToProject(project._id)}>See more</button>
              <button
                type="submit"
                onClick={() => updateProjectHandler(project._id)}
              >
                Edit
              </button>
              <button
                type="submit"
                onClick={() => deleteProjectHandler(project._id)}
              >
                delete
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default UserProject;
