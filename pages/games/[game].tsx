import { GetServerSideProps } from "next";
import { GraphicElements } from "../../component/GraphicElement";
import { getDatabase } from "../../src/database";
import NavBar from "../../component/NavBar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // call and search in the DB
  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find({ slug: context.params.game })
    .toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));

  // check if a game is found, if not display a 404 error
  if (gamesResult[0] === undefined) {
    return { notFound: true };
  }

  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: { games: gamesResult },
    };
  }
  return {
    props: { games: gamesResult, cookie: context.req.cookies.appSession },
  };
};

const game: React.FC<{ games; cookie: string }> = ({ games, cookie }) => {
  return (
    <div>
      <GraphicElements></GraphicElements>
      <h1>{games[0].name}</h1>
      <NavBar cookie={cookie}></NavBar>
    </div>
  );
};

export default game;
