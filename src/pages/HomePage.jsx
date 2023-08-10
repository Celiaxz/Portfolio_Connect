import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import ShareIcon from "/share_icon.svg"
import ConnectIcon from "/connect_icon.svg"
import GithubIcon from "/github.svg"
import FeedbackIcon from "/feedbacks_icon.svg"
import "./HomePage.css"

function HomePage() {
  const { user, isLoading, isLoggedIn } = useContext(AuthContext);


  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Welcome {user ? user.username : null}!</h1>
        </>
      ) : (
        <div className="homePage_container">
          <header className="header">
            <h1>Welcome to Portfolio Connect !</h1>
            <p className="intro">
              Unleash coding creativity and collaboration with Portfolio Connect. Your space to shine, connect, and showcase projects.          </p>
          </header>

        <main className="boxes_container">
          <div className="first_box boxes">
            <div className="category">
              <h4>Share Your Genius:</h4>
              <div className="icon_container">
              <img src={ShareIcon} alt="share icon" className="icons" />
              </div>
              <p>
                Display your coding masterpieces in a visually captivating portfolio. From groundbreaking web applications to elegant mobile apps, show the world your coding prowess and the innovative solutions you've built.
              </p>
            </div>
            <div className="category">
              <h4>Connect and Collaborate:</h4>
              <div className="icon_container">
              <img src={ConnectIcon} alt="connect icon" className="icons" />
              </div>
              <p>
                Forge meaningful connections with fellow developers by exploring their projects, learning from their coding techniques, and engaging in insightful discussions. Learn, collaborate, and be inspired by the vibrant developer community.
              </p>
            </div>
          </div>

          <div className="second_box boxes"> 
            <div className="category">
              <h4>GitHub Integration:</h4>
              <div className="icon_container">
              <img src={GithubIcon} alt="github icon" className="icons" />
              </div>
              <p>
                Seamlessly link your GitHub account to your Portfolio Connect profile and let your projects shine. Share your repositories, demonstrate your coding skills, and give others a glimpse into your coding journey.
              </p>
            </div>
            <div className="category">
              <h4>Meaningful Feedback:</h4>
              <div className="icon_container">
              <img src={FeedbackIcon} alt="feedback icon" className="icons" />
              </div>
              <p>
                Receive valuable feedback on your projects from other developers. Constructive critiques, tips, and insights will help you grow as a developer and refine your skills.
              </p>
            </div>
          </div>

          <p>
            Dive into a world of coding innovation, share your passion for development, and be part of a thriving community at Portfolio Connect. Whether you're here to inspire, learn, or simply connect, the possibilities are endless.
          </p>

          <p>
            Join us on the journey of coding exploration, collaboration, and mutual growth. Let's build, learn, and connect together on Portfolio Connect.
          </p>
        </main>



        </div>
      )}
    </>
  );
}

export default HomePage;
