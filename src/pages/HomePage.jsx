

function HomePage({ user, isLoading }) {


    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Welcome to HomePage {user ? user.username : null}!</h1>
                </>
            )}
        </>
    );
}

export default HomePage;
