import { GetServerSideProps } from "next";
import { GraphicElements } from "../../component/GraphicElement";
import { getDatabase } from "../../src/database";
import NavBar from "../../component/NavBar";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const genre = context.params.genre.toString();

  // call and search in the DB
  const mongodb = await getDatabase();
  const genres = await mongodb
    .db()
    .collection("games")
    .find({ genres: genre.replace(" & ", "/") })
    .toArray();
  const genresResult = JSON.parse(JSON.stringify(genres));

  // check if a genre is found, if not display a 404 error
  if (genresResult[0] === undefined) {
    return { notFound: true };
  }

  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: { genreName: genre, genres: genresResult },
    };
  }
  return {
    props: {
      genreName: genre,
      genres: genresResult,
      cookie: context.req.cookies.appSession,
    },
  };
};

const platform: React.FC<{ genreName: string; genres; cookie: string }> = ({
  genreName,
  genres,
  cookie,
}) => {
  return (
    <div>
      <GraphicElements></GraphicElements>
      <h1>{genreName}</h1>
      <div className="container">
        {genres.map((game) => {
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
