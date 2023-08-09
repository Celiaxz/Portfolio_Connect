import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
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
        if (github.status === 403)
          setErrorMessage("GitHub request limit reached");
        if (github.status === 404) setErrorMessage("GitHub Profile not found");
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, [id]);

  const avatar = projects?.[0].owner.avatar_url;
  const isLoading = projects !== undefined;
  return (
    <>
      {isLoading ? (
        <div>
          {/* <h2 className="user-Projects-Title">My Projects</h2> */}
          <Row gutter={16}>
            <img src={avatar} alt="" />

            {projects.map((project) => (
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
        </div>
      ) : null}
    </>
  );
}

export default GitHub;
