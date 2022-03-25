import { GetServerSideProps } from "next";
import React from "react";
import { getDatabase } from "../../src/database";
import { getSession } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  // Call and search in the DB
  const mongodb = await getDatabase();
  const userLogged = await mongodb
    .db()
    .collection("user")
    .find({ sub: session.user.sub })
    .toArray();

  // if no user are found in the db, create one
  if (userLogged[0] === undefined) {
    mongodb.db().collection("user").insertOne({
      sub: session.user.sub,
      cart: [],
    });
  }

  // Appel de la route api
  const apiRoute = await fetch(
    `${process.env.AUTH0_BASE_URL}/api/cart?user=${userLogged[0].sub}`
  );
  const data = await apiRoute.json();

  return {
    props: { data },
  };
};

const cart = ({ data }) => {
  return <div>{data.user[0].sub}</div>;
};

export default cart;
