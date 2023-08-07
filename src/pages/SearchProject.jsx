// SearchProjects.jsx
import React, { useState } from "react";
import AllProjects from "./AllProjects";

function SearchProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/project/search?term=${searchTerm}`
      );
      if (response.status === 200) {
        const parsed = await response.json();
        setSearchResults(parsed);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log("Error while searching projects:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <AllProjects /> {/* Display all projects here */}
      <h1>Search Projects</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((project) => (
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
