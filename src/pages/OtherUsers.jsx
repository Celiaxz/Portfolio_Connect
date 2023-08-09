import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Row, Col } from "antd";
function OtherUsers() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 50; // Number of users to display per page
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
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const usersToDisplay = users.slice(startIndex, endIndex);
  const shouldLoad = users.length > 0;
  return (
    <div className="other-Users-container">
      {shouldLoad ? (
        <Row gutter={16}>
          {users.map((user) => (
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
    </div>
  );
}

export default OtherUsers;
