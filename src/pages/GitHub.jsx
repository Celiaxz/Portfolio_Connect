import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
import Pagination from "../components/Pagination";
function GitHub() {
  const { id } = useParams();
  const [projects, setProjects] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of projects to display per page

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        const github = await fetch(
          `https://api.github.com/users/${parsed.githubUsername}/repos`
        );
        if (github.status === 403)
          setErrorMessage("GitHub request limit reached");
        if (github.status === 404) setErrorMessage("GitHub Profile not found");
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, [id]);

  // Calculate the index range for projects to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const projectsToDisplay = projects?.slice(startIndex, endIndex) || [];

  const avatar = projects?.[0].owner.avatar_url;
  const isLoading = projects !== undefined;

  // Calculate totalPages based on the number of projects
  const totalPages = Math.ceil((projects?.length || 0) / itemsPerPage);

  // Define click handlers for pagination
  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isLoading ? (
        <div className="other-Users-container">
          {/* <h2 className="user-Projects-Title">My Projects</h2> */}
          <img src={avatar} alt="" />
          <Row gutter={16}>
            {projectsToDisplay.map((project) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
                <Card
                  className="other-Users-card"
                  title={
                    <span className="other-Users-card-title">
                      {project.name}
                    </span>
                  }
                >
                  <p>{project.language}</p>
                  <Link
                    className="others-nav"
                    key={project.html_url}
                    to={project.html_url}
                  >
                    GitHub Project
                  </Link>
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
      ) : null}
    </>
  );
}

export default GitHub;
