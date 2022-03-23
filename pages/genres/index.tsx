import { GetServerSideProps } from "next";
import NavBar from "../../component/NavBar";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call and search in the DB
  const mongodb = await getDatabase();
  const games = await mongodb.db().collection("games").find().toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));
  console.log(gamesResult);

  const allGameWithGenre = gamesResult.filter((game) => {
    if (game.genres.length <= 0) {
      return false;
    } else if (game.genres.length > 0) {
      return true;
    }
  });

  const allGenres = allGameWithGenre.map((game) => {
    return game.genres;
  });

  const genreArray: string[] = [];
  for (let i = 0; i < allGenres.length; i++) {
    allGenres[i].forEach((genre: string) => {
      if (!genreArray.includes(genre.replace("/", ","))) {
        genreArray.push(genre.replace("/", ","));
      }
    });
  }

  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: { genres: genreArray },
    };
  }
  return {
    props: {
      genres: genreArray,
      cookie: context.req.cookies.appSession,
    },
  };
};

const genresIndex = ({ genres, cookie }) => {
  return (
    <div>
      {genres.map((genre) => {
        return <p key={genre}>{genre}</p>;
      })}
      <NavBar cookie={cookie}></NavBar>
    </div>
  );
};

export default genresIndex;
