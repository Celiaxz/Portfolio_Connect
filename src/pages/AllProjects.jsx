// AllProjects.jsx
import React, { useEffect, useState } from "react";

function AllProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const response = await fetch("http://localhost:5005/project/all");
        if (response.status === 200) {
          const parsed = await response.json();
          setProjects(parsed);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.log("Error while fetching all projects:", error);
        setProjects([]);
      }
    }

    fetchAllProjects();
  }, []);

  return (
    <>
      <h2>All Projects</h2>
      {projects.map((project) => (
        <div key={project._id} className="project-details">
          <p>Title: {project.title}</p>
          <p>Technologies: {project.technologies}</p>
          <p>Repository Link: {project.repositoryLink}</p>
          <p>Project Folder: {project.projectFolder}</p>
        </div>
      ))}
    </>
  );
}

export default AllProjects;
