import React from "react";
import { useState } from "react";

function CreateProject() {
  const [project, setProject] = useState();
  const [description, setDescription] = useState();
  const [technologies, setTechnologies] = useState();
  const [repositoryLink, setRepositoryLink] = useState();
  const [projectFolder, setProjectFolde] = useState();

  return <div>CreateProject</div>;
}

export default CreateProject;
