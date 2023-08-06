import axios from "axios";
import React from "react";
import { useState } from "react";

function CreateProject() {
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const [projectFolder, setProjectFolder] = useState("");
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
      const response = await fetch("http://localhost:5005/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payloadJson,
      });
      console.log("this is my POST response: ", response);
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

export default CreateProject;
