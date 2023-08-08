import React, { useEffect, useState } from "react";
import UpdateProject from "./UpdateProject";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        "http://localhost:5005/project/userId/r7ujbbe6kiu"
      );
      if (response.status === 200) {
        const parsed = await response.json();
        console.log("parsed data :", parsed);
        setProjects(parsed);
      }
    }

    fetchProjects();
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
      navigate(`/projects`);
    } catch (error) {
      console.log("Error while deleting the project:", error);
    }
  };

  return (
    <>
      <h1> Projects </h1>
      {projects.map((project) => (
        <div className="projects-list">
          <p>{project.title}</p>
          <p>{project.technologies}</p>
          <p>{project.repositoryLink}</p>
          <p>{project.projectFolder}</p>
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
  );
}

export default Projects;
