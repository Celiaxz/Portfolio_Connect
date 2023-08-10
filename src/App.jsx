import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import UserProject from "./pages/UserProject";
import UpdateProject from "./pages/UpdateProject";
import Project from "./pages/Project";
import SearchProject from "./pages/SearchProject";
import UserPage from "./pages/UserPage";
import GitHub from "./pages/GitHub";
import OthersGithub from "./pages/OthersGithub";
import UpdateUser from "./pages/UpdateUser";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects/:projectId/update" element={<UpdateProject />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/search-projects" element={<SearchProject />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/user/update" element={<UpdateUser />} />
        <Route path="/user/:id/projects" element={<UserProject />} />
        <Route path="/github/:id" element={<GitHub />} />
        <Route path="/otherUsers/:id" element={<OthersGithub />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
