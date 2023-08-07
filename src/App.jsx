import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import UpdateProject from "./pages/UpdateProject";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth.context";

function App() {
  const { isLoggedIn, user, setIsLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage user={user} isLoading={isLoading} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<UpdateProject />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
