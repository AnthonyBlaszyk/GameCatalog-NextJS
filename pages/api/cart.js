import { getDatabase } from "../../src/database";

export default async function handler(req, res) {
  const mongodb = await getDatabase();
  const user = await mongodb
    .db()
    .collection("user")
    .find({ sub: req.query.user })
    .toArray();

  res.status(200).json({ user });
}
