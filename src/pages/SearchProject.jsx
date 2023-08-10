import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
import Pagination from "../components/Pagination";
import "./AllCardsProjectsListing.css";
function SearchProjects() {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 20;
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

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="search-projects-container">
      <div className="search-input-container">
        <h1 className="search-title">Search Projects :</h1>
        <input
          type="text"
          onChange={handleSearch}
          className="search-input"
          placeholder="by title or technology..."
        />
      </div>

      <Row gutter={16}>
        {projectsToDisplay.map((project) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
            <Card
              className="search-project-card"
              title={
                <Link
                  to={`/projects/${project._id}`}
                  className="search-project-card-title"
                >
                  {project.title}
                </Link>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
    </div>
  );
}

export default SearchProjects;
