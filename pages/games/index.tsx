import { GetServerSideProps } from "next";
import { GraphicElements } from "../../component/GraphicElement";
import { getDatabase } from "../../src/database";
import NavBar from "../../component/NavBar";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call and search in the DB
  const mongodb = await getDatabase();
  const games = await mongodb.db().collection("games").find().toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));

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

const games: React.FC<{ games; cookie: string }> = ({ games, cookie }) => {
  return (
    <div>
      <GraphicElements></GraphicElements>
      <h1>Game Catalog</h1>
      <div className="container">
        {games.map((game) => {
          return (
            <div key={game._id} className="flexItem">
              <Link href={`/games/${game.slug}`} passHref>
                <a>{game.name}</a>
              </Link>

              {game.cover === undefined ? (
                <img src="" alt="" />
              ) : (
                <img src={game.cover.url} alt="" />
              )}
            </div>
          );
        })}
      </div>
      <NavBar cookie={cookie}></NavBar>
    </div>
  );
};

export default games;
