import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { BASE_URL } from "../config/config.index";

function ProjectForm(props) {
  const { user } = useContext(AuthContext);
  const { project } = props;

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

    const payload = {
      title,
      description,
      technologies,
      repositoryLink,
      projectFolder,
      userId: user._id,
    };
    const payloadJson = JSON.stringify(payload);
    try {
      let response;
      if (props.isNewProject) {
        response = await fetch(`${BASE_URL}/project/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payloadJson,
        });
        if (response.status === 200) {
          const data = await response.json();
          navigate(`/projects/${data._id}`);
        }
      } else {
        response = await fetch(`${BASE_URL}/project/update/${project._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
          body: payloadJson,
        });
        if (response.status === 200) {
          navigate(`/projects/${project._id}`);
        }
      }
    } catch (error) {
      console.log("error while creating project: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
      <label>
        Technologies:
        <input
          type="text"
          value={technologies}
          placeholder="technologies"
          onChange={(e) => {
            setTechnologies(e.target.value);
          }}
        />
      </label>
      <label>
        Repository Link:
        <input
          type="text"
          value={repositoryLink}
          placeholder="repositoryLink"
          onChange={(e) => {
            setRepositoryLink(e.target.value);
          }}
        />
      </label>
      <label>
        Download link:
        <input
          type="text"
          value={projectFolder}
          placeholder="projectFolder"
          onChange={(e) => {
            setProjectFolder(e.target.value);
          }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProjectForm;
