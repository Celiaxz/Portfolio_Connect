

function HomePage({ user }) {


    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Welcome to HomePage {user ? user.username : null}!</h1>
                    <label>
                        Username:
                        <input type="text" />
                    </label>
                    <label>
                        Password:
                        <input type="password" />
                    </label>
                    <button>Login</button>
                </>
            )}
        </>
    );
}

export default HomePage;
