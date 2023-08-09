import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Row, Col } from "antd";
import Pagination from "../components/Pagination";
function OtherUsers() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllUsers() {
      const response = await fetch(`${BASE_URL}/user/users/all`);
      if (response.status === 200) {
        const parsed = await response.json();
        setUsers(parsed);
      }
    }
    fetchAllUsers();
  }, []);
  // Calculate the index range for users to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToDisplay = users.slice(startIndex, endIndex);

  // Calculate totalPages based on the number of users
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Define click handlers for pagination
  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };
  const shouldLoad = users.length > 0;
  return (
    <div className="other-Users-container">
      {shouldLoad ? (
        <Row gutter={16}>
          {usersToDisplay.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user._id}>
              <Card
                className="other-Users-card"
                title={
                  <span className="other-Users-card-title">
                    {user.githubUsername}
                  </span>
                }
              >
                <img src={user.image} alt="" />
                <p>{user.aboutMe ? user.aboutMe : "My Bio"}</p>
                <NavLink className="others-nav" to={`/github/${user._id}`}>
                  Github Projects
                </NavLink>
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
    </div>
  );
}

export default OtherUsers;
