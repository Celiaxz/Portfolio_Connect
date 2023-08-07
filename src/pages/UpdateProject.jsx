import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ProjectForm from "../components/ProjectForm";
import { Link, useParams } from "react-router-dom";

function UpdateProject() {
  const [project, setProject] = useState(undefined);
  const { projectId } = useParams();
  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        `http://localhost:5005/project/${projectId}`
      );
      if (response.status === 200) {
        const parsed = await response.json();
        console.log("parsed data :", parsed);
        setProject(parsed);
      }
    }

    fetchProjects();
  }, []);
  return (
    <>
      {project && (
        <ProjectForm isNewProject={false} project={project}></ProjectForm>
      )}
    </>
  );
}

export default UpdateProject;
