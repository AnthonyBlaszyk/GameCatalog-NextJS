import Link from "next/link";

const NavBar = (props: { cookie: string }) => {
  return (
    <div>
      <div className="navBar">
        <div>
          {props.cookie ? (
            <a href="/api/auth/logout">Logout</a>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </div>
        <div>
          <Link href="/games">
            <a>Games</a>
          </Link>
          <Link href="/genres">
            <a>Genres</a>
          </Link>
          <Link href="/platforms">
            <a>Platforms</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
