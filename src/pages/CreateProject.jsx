import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

function CreateProject() {
  return <ProjectForm isNewProject={true}></ProjectForm>;
}

export default CreateProject;
