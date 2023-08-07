import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import UpdateProject from "./pages/UpdateProject";
import UserPage from "./pages/UserPage";

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
        <Route path="/projects/:projectId" element={<Project />}></Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
