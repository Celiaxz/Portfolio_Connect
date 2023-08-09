import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
function SearchProjects() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const response = await fetch(`${BASE_URL}/project/all/projects`);
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
      const filteredProj = new Set();
      projects.forEach((project) => {
        if (project.title?.toLowerCase().includes(value.toLowerCase())) {
          filteredProj.add(project);
        }
      });
      projects.forEach((project) => {
        const technologies = project.technologies;
        technologies?.forEach((tech) => {
          if (tech?.toLowerCase().includes(value.toLowerCase())) {
            filteredProj.add(project);
          }
        });
      });
      setFilteredProjects([...filteredProj]);
    } else {
      setFilteredProjects(projects);
    }
  };

  const redirectToProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // return (
  //   <>
  //     <h1>Search Projects</h1>
  //     <input type="text" onChange={handleSearch} />
  //     {filteredProjects.map((project) => (
  //       <div className="projects-list" key={project._id}>
  //         <p>
  //           Title: <Link to={`/projects/${project._id}`}>{project.title}</Link>
  //         </p>
  //         <p>Technologies: {project.technologies}</p>
  //         <p>Repository Link: {project.repositoryLink}</p>
  //         <p>Project Folder: {project.projectFolder}</p>
  //         <button onClick={() => redirectToProject(project._id)}>
  //           See more
  //         </button>
  //       </div>
  //     ))}
  //   </>
  // );
  return (
    <div className="search-projects-container">
      <h1>Welcome to Search Projects</h1>
      <h2>Projects</h2>
      <Row gutter={16}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
            <Card
              className="search-project-card"
              title={
                <span className="search-project-card-title">
                  {project.title}
                </span>
              }
            >
              <p>Technologies: {project.technologies}</p>
              <p>Repository Link: {project.repositoryLink}</p>
              <p>Project Folder: {project.projectFolder}</p>
              <div className="search-project-card-actions">
                <Button onClick={() => redirectToProject(project._id)}>
                  See more
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchProjects;
