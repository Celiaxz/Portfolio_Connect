import { Route, Routes } from 'react-router-dom'
import './App.css'
<<<<<<< HEAD
import HomePage from './components/HomePage'
import Signup from './components/Signup'
=======
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
>>>>>>> emi-branch
import Navbar from './components/Navbar'

function App() {

  return (
    <>
<<<<<<< HEAD
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<Signup/>}/>
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
>>>>>>> emi-branch
      </Routes>
    </>
  )
}

export default App
