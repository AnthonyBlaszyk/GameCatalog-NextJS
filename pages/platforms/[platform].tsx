import { GetServerSideProps } from "next";
import { GraphicElements } from "../../component/GraphicElement";
import { getDatabase } from "../../src/database";
import NavBar from "../../component/NavBar";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // call and search in the DB
  const mongodb = await getDatabase();
  const platforms = await mongodb
    .db()
    .collection("games")
    .find({ "platform.name": context.params.platform })
    .toArray();
  const platformsResult = JSON.parse(JSON.stringify(platforms));

  // check if a platform is found, if not display a 404 error
  if (platformsResult[0] === undefined) {
    return { notFound: true };
  }

  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: { platform: platformsResult },
    };
  }
  return {
    props: {
      platforms: platformsResult,
      cookie: context.req.cookies.appSession,
    },
  };
};

const platform: React.FC<{ platforms; cookie: string }> = ({
  platforms,
  cookie,
}) => {
  return (
    <div>
      <GraphicElements></GraphicElements>
      <h1>{platforms[0].platform.name}</h1>
      <div className="container">
        {platforms.map((game) => {
          return (
            <div key={game._id} className="flexItem">
              <Link href={`/games/${game.slug}`} passHref>
                <p>{game.name}</p>
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

export default platform;
