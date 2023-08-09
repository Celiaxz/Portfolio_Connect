import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { BASE_URL } from "../config/config.index";
import "./ProjectForm.css"

function ProjectForm(props) {
   const { user } = useContext(AuthContext);
   const { project } = props;

   const [title, setTitle] = useState(project?.title ?? "");
   const [description, setDescription] = useState(project?.description ?? "");
   const [technologies, setTechnologies] = useState(project?.technologies ?? ["", ""]);
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

   const handleAddTech = () => {
      const newTechAdded = [...technologies, ""]
      setTechnologies(newTechAdded)
   }

   const handleTechChange= (e, index)=>{
      const updatedTech = [...technologies];
   updatedTech[index] = e.target.value;
   setTechnologies(updatedTech);
   }

   const handleRemoveTech = (index)=>{
      const removedTech = [...technologies]
      removedTech.splice(index, 1)
      setTechnologies(removedTech)
   }

   return (
      <>
      <h1 className="project_h1">New Project</h1>
      <form className="project_form" onSubmit={handleSubmit}>
         <div className="form_inputs">
            <div className="no_tech_inputs">
               <label>Project Name</label>
               <input type="text" value={title} placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />
               <label>Description:</label>
               <textarea value={description} placeholder="description" onChange={(e) => { setDescription(e.target.value) }} />
               <label>
                  Repository Link</label>
               <input type="text" value={repositoryLink} placeholder="repositoryLink" onChange={(e) => { setRepositoryLink(e.target.value) }} />
               <label> Download link</label>
               <input type="text" value={projectFolder}
                  placeholder="projectFolder"
                  onChange={(e) => { setProjectFolder(e.target.value) }} />
            </div>
            <div className="technologies_inputs">
               <label>Technologies</label>
               {technologies.map((tech, index) => (
                  <div key={index} className="one_tech_input">
                     <input
                        type="text"
                        value={tech}
                        placeholder={`Technology`}
                        onChange={(e) => handleTechChange(e, index)}
                     />
                     <button type="button" className="tech_button" onClick={() => handleRemoveTech(index)}>-</button>
                  </div>
               ))}
               <div className="add_tech_div"><p>Add new</p>
               <button type="button" className="tech_button" onClick={handleAddTech}>+</button>
               </div>
            </div>
         </div>
         <button className="submit_button" type="submit">{props.isNewProject ? "Create New Project" : "Update Project"}</button>
      </form>
      </>
   );
}

export default ProjectForm;
