import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";

function UserProject() {
  const { id } = useParams();
  const { isLoading, user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const [projects, setProjects] = useState([]);
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
        // Project was deleted successfully, remove it from the state
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

  return (
    <div className="user-project-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Welcome to {wantedUser ? wantedUser.username : null}'s page</h1>
          <h2>Projects</h2>
          <Row gutter={16}>
            {projects.map((project) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
                <Card
                  className="project-card"
                  title={
                    <span className="project-card-title">{project.title}</span>
                  }
                >
                  <p>{project.technologies}</p>
                  <p>{project.repositoryLink}</p>
                  <p>{project.projectFolder}</p>
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
        </div>
      )}
    </div>
  );
}
export default UserProject;
