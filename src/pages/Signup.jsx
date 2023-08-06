import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async event => {
        event.preventDefault()
        const newUser = {username, email, password}

        try {
            const response = await axios.post("http://localhost:5005/auth/signup", newUser)
            console.log("new user: ", response)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Welcome to Signup</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input value={username} onChange={event => setUsername(event.target.value)} />
                </label>
                <label>
                    E-mail:
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </label>
                <button>Signup</button>
            </form>
        </>
    )
}

export default Signup;