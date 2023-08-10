import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config.index";
import { Button, FileInput, TextInput, Textarea } from "@mantine/core";
import "./UpdateUser.css"

function UpdateUser() {
  const { user } = useContext(AuthContext);
  const [username, setUserame] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    if (user) {
      setUserame(user.username || "");
      setGithubUsername(user.githubUsername || "");
      setEmail(user.email || "");
      setSkills(user.skills || "");
      setAboutMe(user.aboutMe || "");
    }
  }, [user]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if(image){
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = async () => {
          const cloudinaryResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dil1ycvmp/image/upload',
            {
              file: reader.result,
              upload_preset: "aitdf0nt" 
            }
          )
          if (cloudinaryResponse.status === 200){
            const payload = {
              username,
              githubUsername,
              email,
              skills,
              image: cloudinaryResponse.data.url,
              aboutMe,
            };
            const response = await axios.put(
              `${BASE_URL}/user/update/${user._id}`,
              payload
            );
            if (response.status === 200) {
              navigate(`/user/${user._id}`);
            }
          }
        }
      } else {
        const payload = {
          username,
          githubUsername,
          email,
          skills,
          aboutMe,
        };
        const response = await axios.put(
          `${BASE_URL}/user/update/${user._id}`,
          payload
        );
        if (response.status === 200) {
          navigate(`/user/${user._id}`);
        }
      }
    } catch (error) {
      console.log(error);
      }
  };

  const handleAddSkill = () => {
    const newSkillAdded = [...skills, ""]
    setSkills(newSkillAdded)
 }

 const handleSkillChange= (e, index)=>{
    const updatedSkills = [...skills];
    updatedSkills[index] = e.target.value;
    setSkills(updatedSkills);
 }

 const handleRemoveSkill = (index)=>{
    const removedSkill = [...skills]
    removedSkill.splice(index, 1)
    setSkills(removedSkill)
 }

  return (
    <div className="form-container">
      <h1>Update User Page</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="non-skill-inputs">
            <label>Username</label>
              <TextInput
                value={username}
                onChange={(event) => setUserame(event.target.value)}
              />
            <label>GitHub Username</label>
              <TextInput
                value={githubUsername}
                onChange={(event) => setGithubUsername(event.target.value)}
              />
            <label>E-mail</label>
              <TextInput
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            <label>Profile Image</label>
              <FileInput
                className="upload-button"
                type="file"
                placeholder="Upload Image"
                value={image}
                onChange={setImage}
              />
            <label>About Me</label>
              <Textarea
                rows="10"
                cols="50"
                value={aboutMe}
                onChange={(event) => setAboutMe(event.target.value)}
              />
          </div>
          <div className="skill-inputs">
            <label>Skills</label>
            {skills.map((skill, index) => (
              <div key={index} className="one-skill-input">
                <TextInput
                  value={skill}
                  onChange={(event) => handleSkillChange(event, index)}
                />
                <Button type="button" className="skill-button" onClick={() => handleRemoveSkill(index)}>-</Button>
              </div>
            ))}
            <div className="add-skill-div">
              <p>Add new</p>
              <Button type="button" className="skill-button" onClick={handleAddSkill}>+</Button>
            </div>
          </div>
        </div>
        <Button className="submit-button" type="submit">Update</Button>
      </form>
    </div>
  );
}

export default UpdateUser;