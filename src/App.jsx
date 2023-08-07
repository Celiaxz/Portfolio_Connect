import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import UpdateProject from "./pages/UpdateProject";
import SearchProject from "./pages/SearchProject";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<UpdateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/search-projects" element={<SearchProject />} />
      </Routes>
    </>
  );
}

export default App;
