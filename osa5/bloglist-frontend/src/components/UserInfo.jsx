const UserInfo = ({ x: { user: { name }, setUser } }) => (
    <>
        <p>{name} logged in</p>
        <button onClick={() => {
            setUser(null);
            localStorage.removeItem('user');
        }}>logout</button>
    </>
);

export default UserInfo;
