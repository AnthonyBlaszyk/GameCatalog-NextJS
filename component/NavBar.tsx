const NavBar = (props: { cookie: string }) => {
  return (
    <div>
      <div className="navBar">
        <button>
          {props.cookie ? (
            <a href="/api/auth/logout">Logout</a>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
