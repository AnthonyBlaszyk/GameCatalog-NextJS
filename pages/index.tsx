import cookie from "cookie";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.appSession === undefined) {
    return {
      props: {},
    };
  }
  return {
    props: { cookie: context.req.cookies.appSession },
  };
};

export default function Home(props) {
  return (
    <div>
      <button>
        {props.cookie ? (
          <a href="/api/auth/logout">Logout</a>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </button>
    </div>
  );
}
