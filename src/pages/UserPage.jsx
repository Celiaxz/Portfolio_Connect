import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useParams } from "react-router-dom";

function UserPage() {
    const {id} = useParams()
    const {isLoading} = useContext(AuthContext)
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
          const response = await fetch(
            `http://localhost:5005/project/userId/${id}`
          );
          if (response.status === 200) {
            const parsed = await response.json();
            console.log("parsed data :", parsed);
            setProjects(parsed);
          }
        }
    
        fetchProjects();
    }, []);

    return (
        <>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <>
                <h1>Welcome to UserPage</h1>
                <h2>Projects</h2>
                {projects.map((project) => (
                    <div key={project._id} className="projects-list">
                        <p>{project.title}</p>
                        <p>{project.technologies}</p>
                        <p>{project.repositoryLink}</p>
                        <p>{project.projectFolder}</p>
                    </div>
                    )
                )}
            </>            
        )
        }
        </>
    )
}

export default UserPage;