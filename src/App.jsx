import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import IndexPage from './pages/IndexPage'
import UserPage from './pages/UserPage'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/userId/:userId" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
