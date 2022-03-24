import { GetServerSideProps } from "next";
import React from "react";
import { getDatabase } from "../../src/database";
import Profile from "../../component/user";
import { getSession } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  console.log(session);

  // Call and search in the DB
  const mongodb = await getDatabase();
  const userLogged = await mongodb.db().collection("user").find().toArray();

  // check the cookie, if found return it in the props
  return {
    props: {},
  };
};

// export function createArtist(
//   db: mongo.Db,
//   firstName: string,
//   lastName: string
// ): Promise<mongo.InsertOneResult<mongo.Document>> {
//   return db.collection("artists").insertOne({
//     firstName: firstName,
//     lastName: lastName,
//     songs: [],
//     albums: [],
//   });
// }

const cart = () => {
  const user = Profile();
  console.log(user.props);
  return <div></div>;
};

export default cart;
