import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
function GitHub() {
  const { id } = useParams();
  const [projects, setProjects] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      console.log(response)
      if (response.status === 200) {
        const parsed = await response.json();
        const github = await fetch(
          `https://api.github.com/users/${parsed.githubUsername}/repos`
        );
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, []);

  if(projects){
    if(projects.message !== 'Not Found'){
      const avatar = projects?.[0].owner.avatar_url;
      return (
        <>
            <div>
              <img src={avatar} alt="" />
              {projects.map((project) => (
                <div key={project.id} className="projects-list">
                  <p>{project.name}</p>
                  <p>{project.language}</p>
                  <Link key={project.html_url} to={project.html_url}>
                    GitHub Project
                  </Link>
                </div>
              ))}
            </div>
        </>
      );
    } else {
      return <h2>GitHub Profile not found</h2>
    }
  } else {
    return <h2>...Loading</h2>
  }
}

export default GitHub;
