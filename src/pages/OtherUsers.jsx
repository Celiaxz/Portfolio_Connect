import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
function OtherUsers() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
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
  const shouldLoad = users.length > 0;
  return (
    <>
      {shouldLoad ? (
        <div>
          {users.map((user) => (
            <div key={user._id} className="projects-list">
              <img src={user.image} alt="" />
              <p>{user.githubUsername}</p>
              <p>{user.aboutMe ? user.aboutMe : "My Bio"}</p>
              <NavLink to={`/github/${user._id}`}>Github Projects</NavLink>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default OtherUsers;
