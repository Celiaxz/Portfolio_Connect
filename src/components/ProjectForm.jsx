import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function ProjectForm(props) {
  const { user } = useContext(AuthContext);

  const { project } = props;

  //  const [project, setProject] = useState(props.project ?? "");
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [technologies, setTechnologies] = useState(project?.technologies ?? "");
  const [repositoryLink, setRepositoryLink] = useState(
    project?.repositoryLink ?? ""
  );
  const [projectFolder, setProjectFolder] = useState(
    project?.projectFolder ?? ""
  );
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        technologies,
        repositoryLink,
        projectFolder,

      };
      const payloadJson = JSON.stringify(payload);
      console.log("payload: ", payloadJson);
      let response;
      if (props.isNewProject) {
        const newProject = { ...payload, userId: user._id }
        response = await fetch("http://localhost:5005/project/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        });
      } else {
        response = await fetch(
          `http://localhost:5005/project/update/${project._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${authToken}`,
            },
            body: payloadJson,
          }
        );
      }

      console.log("this is my POST response: ", response);
      if (response.status === 200) {
        const newProject = await response.json();
        navigate("/projects");
      }
    } catch (error) {
      console.log("error while creating project: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        value={description}
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        value={technologies}
        placeholder="technologies"
        onChange={(e) => {
          setTechnologies(e.target.value);
        }}
      />
      <input
        type="text"
        value={repositoryLink}
        placeholder="repositoryLink"
        onChange={(e) => {
          setRepositoryLink(e.target.value);
        }}
      />
      <input
        type="text"
        value={projectFolder}
        placeholder="projectFolder"
        onChange={(e) => {
          setProjectFolder(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProjectForm;
