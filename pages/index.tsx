import { GetServerSideProps } from "next";
import NavBar from "../component/NavBar";

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

export default function Home(props: { cookie: string }) {
  return (
    <div>
      <NavBar cookie={props.cookie}></NavBar>
    </div>
  );
}
