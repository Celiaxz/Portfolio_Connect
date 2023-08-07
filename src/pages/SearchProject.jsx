// SearchProjects.jsx
import React, { useEffect, useState } from "react";

// function AllProjects() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     async function fetchAllProjects() {
//       try {
//         const response = await fetch("http://localhost:5005/project/all");
//         if (response.status === 200) {
//           const parsed = await response.json();
//           setProjects(parsed);
//         } else {
//           setProjects([]);
//         }
//       } catch (error) {
//         console.log("Error while fetching all projects:", error);
//         setProjects([]);
//       }
//     }

//     fetchAllProjects();
//   }, []);
// }
function SearchProjects() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const response = await fetch(
          "http://localhost:5005/project/all/projects"
        );
        if (response.status === 200) {
          const parsed = await response.json();
          setProjects(parsed);
          setFilteredProjects(parsed);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.log("Error while fetching all projects:", error);
        setProjects([]);
      }
    }

    fetchAllProjects();
  }, []);

  const handleSearch = async (evt) => {
    const value = evt.target.value;
    if (value !== undefined && value.length > 0) {
      const filteredProj = [];
      projects.forEach((project) => {
        if (project.title.toLowerCase().includes(value.toLowerCase())) {
          filteredProj.push(project);
        }
      });
      setFilteredProjects(filteredProj);
    } else {
      setFilteredProjects(projects);
    }
  };

  return (
    <>
      <h1>Search Projects</h1>
      <input type="text" onChange={handleSearch} />
      {/* <button onClick={handleSearch}>Search</button> */}
      {filteredProjects.map((project) => (
        <div key={project._id} className="project-details">
          <p>Title: {project.title}</p>
          <p>Technologies: {project.technologies}</p>
          <p>Repository Link: {project.repositoryLink}</p>
          <p>Project Folder: {project.projectFolder}</p>
        </div>
      ))}
    </>
  );
}

export default SearchProjects;
