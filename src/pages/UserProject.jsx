import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
import Pagination from "../components/Pagination";
import "./AllCardsProjectsListing.css";

function UserProject() {
  const { id } = useParams();
  const { isLoading, user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 30;
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
        setProjects(parsed.projects);
      }
    }
    fetchUser();
    console.log(wantedUser);
  }, []);

  const updateProjectHandler = (projectId) => {
    navigate(`/projects/${projectId}/update`);
  };

  const deleteProjectHandler = async (projectId) => {
    try {
      const response = await fetch(`${BASE_URL}/project/delete/${projectId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      } else {
        console.log("Failed to delete the project");
      }
    } catch (error) {
      console.log("Error while deleting the project:", error);
    }
  };

  const redirectToProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projectsToDisplay = projects.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="user-project-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="welcome-User">
            hi! {wantedUser ? wantedUser.username : null}
          </h1>
          <h2 className="user-Projects-Title">My Projects</h2>
          <Row gutter={16}>
            {projectsToDisplay.map((project) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
                <Card
                  className="project-card"
                  title={
                    <Link
                      to={`/projects/${project._id}`}
                      className="project-card-title"
                    >
                      {project.title}
                    </Link>
                  }
                >
                  <p>{project.technologies}</p>
                  <p>Repo Link: {project.repositoryLink}</p>
                  <p>Project Folder: {project.projectFolder}</p>
                  <div className="project-card-actions">
                    <Button onClick={() => redirectToProject(project._id)}>
                      See more
                    </Button>
                    <Button onClick={() => updateProjectHandler(project._id)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteProjectHandler(project._id)}>
                      Delete
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
      )}
    </div>
  );
}
export default UserProject;
