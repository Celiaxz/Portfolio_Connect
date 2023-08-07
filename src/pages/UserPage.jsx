import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserPage({ user, isLoading }) {
    const params = useParams()
    const [projects, setProjects] = useState([]);
    console.log(params)

    useEffect(() => {
        async function fetchProjects() {
          const response = await fetch(
            `http://localhost:5005/project/userId/${params.id}`
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
                ))}
            </>            
        )
        }
        </>
    )
}

export default UserPage;