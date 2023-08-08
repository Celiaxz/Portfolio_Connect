import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config.index";
function UpdateUser() {
  const { user } = useContext(AuthContext);
  const [username, setUserame] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    if (user) {
      setUserame(user.username || "");
      setGithubUsername(user.githubUsername || "");
      setEmail(user.email || "");
      setSkills(user.skills || "");
      setImage(user.image || "");
      setAboutMe(user.aboutMe || "");
    }
  }, [user]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      username,
      githubUsername,
      email,
      skills,
      image,
      aboutMe,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/user/update/${user._id}`,
        payload
      );
      if (response.status === 200) {
        navigate(`/user/${user._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Update User Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => setUserame(event.target.value)}
          />
        </label>
        <label>
          GitHub Username:
          <input
            value={githubUsername}
            onChange={(event) => setGithubUsername(event.target.value)}
          />
        </label>
        <label>
          E-mail:
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Skills:
          <input
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />
        </label>
        <label>
          Profile Image URL:
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <label>
          About Me:
          <textarea
            rows="10"
            cols="50"
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}
          />
        </label>
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default UpdateUser;
