import { GetServerSideProps } from "next";
import NavBar from "../../component/NavBar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: {},
    };
  }
  return {
    props: {
      cookie: context.req.cookies.appSession,
    },
  };
};

const genre = ({ cookie }) => {
  return (
    <div>
      <NavBar cookie={cookie}></NavBar>
    </div>
  );
};

export default genre;
