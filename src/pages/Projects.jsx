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
        </div>
      ))}
    </>
  );
}

export default Projects;
