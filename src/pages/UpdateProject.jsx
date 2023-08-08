import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ProjectForm from "../components/ProjectForm";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
function UpdateProject() {
  const [project, setProject] = useState(undefined);
  const { projectId } = useParams();

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/project/${projectId}`);
      if (response.status === 200) {
        setProject(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
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
