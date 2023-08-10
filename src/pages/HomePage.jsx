import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
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
          <h1>Welcome to Portfolio Connect!</h1>
          <p className="intro">Unveil the world of coding creativity and collaboration through our platform designed for developers, by developers. Portfolio Connect empowers you to showcase your coding journey, share your projects, and connect with like-minded developers. Whether you're an aspiring programmer, an open-source enthusiast, or a coding veteran, Portfolio Connect is your space to shine.</p>

          <div>
            <h4>Share Your Genius:</h4>
            <p>
              Display your coding masterpieces in a visually captivating portfolio. From groundbreaking web applications to elegant mobile apps, show the world your coding prowess and the innovative solutions you've built.
            </p>
            <h4>Connect and Collaborate:</h4>
            <p>
              Forge meaningful connections with fellow developers by exploring their projects, learning from their coding techniques, and engaging in insightful discussions. Learn, collaborate, and be inspired by the vibrant developer community.
            </p>
          </div>

          <div>
              <h4>GitHub Integration:</h4>
            <p>
              Seamlessly link your GitHub account to your Portfolio Connect profile and let your projects shine. Share your repositories, demonstrate your coding skills, and give others a glimpse into your coding journey.
            </p>
            <h4>Meaningful Feedback:</h4>
            <p>
              Receive valuable feedback on your projects from other developers. Constructive critiques, tips, and insights will help you grow as a developer and refine your skills.
            </p>
          </div>


          <p>
            Dive into a world of coding innovation, share your passion for development, and be part of a thriving community at Portfolio Connect. Whether you're here to inspire, learn, or simply connect, the possibilities are endless.
          </p>

          <p>
            Join us on the journey of coding exploration, collaboration, and mutual growth. Let's build, learn, and connect together on Portfolio Connect.
          </p>

        </div>
      )}
    </>
  );
}

export default HomePage;
