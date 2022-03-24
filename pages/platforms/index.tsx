import { GetServerSideProps } from "next";
import Link from "next/link";
import { GraphicElements } from "../../component/GraphicElement";
import NavBar from "../../component/NavBar";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call and search in the DB
  const mongodb = await getDatabase();
  const games = await mongodb.db().collection("games").find().toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));

  // Create an empty arrray to stock the platforms
  const allPlatforms = [];
  // Stock all the platforms
  const result = gamesResult.map((game) => allPlatforms.push(game.platform));
  const platformName: string[] = [];
  const platformObject: {
    name: string;
    platform_logo_url: string;
    url: string;
  }[] = [];
  // Create an array with only 1 type of platforms
  for (let i = 0; i < allPlatforms.length; i++) {
    if (!platformName.includes(allPlatforms[i].name)) {
      platformName.push(allPlatforms[i].name);
      platformObject.push(allPlatforms[i]);
    }
  }

  // check the cookie, if found return it in the props
  if (context.req.cookies.appSession === undefined) {
    return {
      props: { platforms: platformObject },
    };
  }
  return {
    props: {
      platforms: platformObject,
      cookie: context.req.cookies.appSession,
    },
  };
};

const platformIndex = ({ platforms, cookie }) => {
  return (
    <div>
      <GraphicElements></GraphicElements>
      <h1>All platforms</h1>
      <div className="buttonList">
        {platforms.map((platform) => {
          return (
            <div key={platform.name}>
              <div className="buttonDiv">
                <Link href={`/platforms/${platform.name}`} passHref>
                  <a>{platform.name}</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <NavBar cookie={cookie}></NavBar>
    </div>
  );
};

export default platformIndex;
