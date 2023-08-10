import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Container, Grid, SimpleGrid, Button, useMantineTheme, rem } from '@mantine/core';
import "./UserPage.css"

function UserPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [wantedUser, setWantedUser] = useState(null);
  const navigate = useNavigate();

  const PRIMARY_COL_HEIGHT = rem(300);
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setWantedUser(parsed);
      }
    }
    fetchUser();
  }, [id]);

  if (user && wantedUser) {
    return (
      <>
        <h1>Welcome to {wantedUser.username}'s page</h1>
        <Container my="md">
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Grid gutter="md">
              <Grid.Col>
                <div height={SECONDARY_COL_HEIGHT} radius="md" animate="false">
                  <img
                    style={{
                      maxHeight: "200px",
                      maxWidth: "200px",
                      borderRadius: "50%",
                    }}
                    src={wantedUser.image}
                    alt="profile image"
                  />
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="skills-container" height={SECONDARY_COL_HEIGHT} radius="md" animate="false" >
                  <h3>Skills:</h3>
                  <ul style={{ listStyle: "none" }}>
                    {wantedUser.skills.map((skill, index) => {
                      return <li key={index}>{skill}</li>;
                    })}
                  </ul>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="project-link-container" height={SECONDARY_COL_HEIGHT} radius="md" animate="false" >
                  <Button onClick={() => navigate(`/user/${id}/projects`)}>Projects</Button>
                  <Button onClick={() => navigate(`/github/${user._id}`)}>Githhub Projects</Button>
                </div>
              </Grid.Col>
              <Button
                    className={id !== user._id ? "hidden" : null}
                    onClick={() => navigate(`/user/update`)}
                  >
                    Update Profile
                  </Button>
            </Grid>
            <div height={SECONDARY_COL_HEIGHT} radius="md" animate="false">
              <h2>About Me:</h2>
              <p>{wantedUser.aboutMe}</p>
            </div>
          </SimpleGrid>
        </Container>
      </>
    );
  } else {
    return <h2>...Loading</h2>;
  }
}

export default UserPage;