import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link } from "react-router-dom";

function HomePage() {
  const { user, isLoading, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to HomePage {user ? user.username : null}!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque omnis autem vel dolorem minima, quod ex suscipit aliquam quae. Mollitia illum est sint velit saepe dolorum quam tempore repellendus dignissimos.</p>
          <Link to="/signup">Login</Link>
          <Link to="/login">Signup</Link>
        </>
      )}
    </>
  );
}

export default HomePage;
