import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Text,
} from "@mantine/core";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, errorMessage } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = { username, password };
    await handleLogin(currentUser);
  };

  return (
    <Container
      size="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="lg">
          <TextInput
            required
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Stack>
      </form>{" "}
    </Container>
  );
}
//     <>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </>
//   );
// }

export default Login;
