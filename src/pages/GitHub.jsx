import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
function GitHub() {
  const { id } = useParams();
  const [projects, setProjects] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        const github = await fetch(
          `https://api.github.com/users/${parsed.githubUsername}/repos`
        );
        if(github.status === 403) setErrorMessage("GitHub request limit reached")
        if(github.status === 404) setErrorMessage("GitHub Profile not found")
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, [id]);

  if(projects){
    if(!projects.message){
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
      return <h2>{errorMessage}</h2>
    }
  } else {
    return <h2>...Loading</h2>
  }
}

export default GitHub;
