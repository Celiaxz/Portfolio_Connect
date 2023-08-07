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
import UserPage from "./pages/UserPage";

function App() {
  const { isLoggedIn, user, setUser, setIsLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage user={user} isLoading={isLoading} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create-project" user={user} element={<CreateProject />} />
        <Route path="/project/:projectId" element={<UpdateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/user/:id" element={<UserPage user={user} isLoading={isLoading}/>} />
      </Routes>
    </>
  );
}

export default App;
