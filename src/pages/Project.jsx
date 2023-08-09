import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { BASE_URL } from "../config/config.index";
import Comments from "../components/Comments";
import "./Project.css"

function Project() {
   const [currentProject, setCurrentProject] = useState(null);
   const { user } = useContext(AuthContext);
   const { projectId } = useParams();
   const [allComments, setAllComments] = useState([]);
   const navigate = useNavigate();

   //Fetch the current project
   const fetchProject = async () => {
      try {
         const response = await axios.get(`${BASE_URL}/project/${projectId}`);
         if (response.status === 200) {
            setCurrentProject(response.data);
            setAllComments(response.data.comments);
         }
      } catch (error) {
         console.error(error);
      }
   }

   //Updating project button redirect to form page
   const handleUpdateButton = () => {
      navigate(`/projects/${projectId}/update`);
   }

   //Deleting the project
   const handleDeleteButton = async () => {
      try {
         //Deleting all comments related to the project first when there are comments
         if (allComments.length > 0) {
            allComments.forEach(async (comment) => {
               try {
                  const responseComments = await axios.delete(
                     `${BASE_URL}/project/${projectId}/comments/delete`
                  );
                  if (responseComments.status === 204) {
                     console.log("comments deleted");
                  }
               } catch (error) {
                  console.error(error);
               }
            });
         }
         //After deleting all comments, then delete the current project
         const response = await axios.delete(
            `${BASE_URL}/project/delete/${projectId}`
         );
         if (response.status === 200) {
            navigate(`/user/${user._id}`);
         }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      fetchProject();
   }, []);

   if (!currentProject) {
      return <p>Loading...</p>;
   }
   const {
      title,
      description,
      technologies,
      repositoryLink,
      projectFolder,
      userId,
   } = currentProject
   return (
      <div className="project_page">
         <div className="title_div">
               <h1>Project : {title}</h1>
               {user && userId._id === user._id && (
               <div className="project_buttons">
                  <button className="project_link" onClick={handleUpdateButton}>Update Project</button>
                  <button className="project_link" onClick={handleDeleteButton}>Delete Project</button>
               </div>
            )}
         </div>
            <div className="project_section">
               <ul className="tech_list">
                  {technologies.map((technology) => 
                        {return technology.length > 0 &&
                           <li key={technology}>{technology}</li>
                        }
                  )}
               </ul>
               <div className="project_second_part">
               <p className="description">{description}</p>
               <Link className="project_links" to={repositoryLink}>Link to repo</Link>
               <Link className="project_links" to={projectFolder}>Download project</Link>
               <p className="creator">by <Link className="author" to={`/user/${userId._id}`}>{userId.username}</Link></p>
               </div>
            </div>
         <Comments projectId={projectId} setAllComments={setAllComments} allComments={allComments} />
      </div>
   );
}

export default Project
