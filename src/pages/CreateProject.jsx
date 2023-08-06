import React from "react";
import { useState } from "react";

function CreateProject() {
  const [project, setProject] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [technologies, setTechnologies] = useState();
  const [repositoryLink, setRepositoryLink] = useState();
  const [projectFolder, setProjectFolder] = useState();
  const handleSubmit = (e) => {
    e.preventDefaut();
    onsumbit({
      title,
      description,
      technologies,
      repositoryLink,
      projectFolder,
    });
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
