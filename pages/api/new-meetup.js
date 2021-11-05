import { MongoClient } from "mongodb";

// /api/new-meetup
async function handler(req, res) {
  // console.log("req :>> ", req);
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const DATABASE_URL = "mongodb://192.168.86.100:27017/udemy-react";
    const MONGO_DB = "udemy-react";
    const MONGO_COLLECTION = "meetups";

    const client = await MongoClient.connect(DATABASE_URL);
    const db = client.db();

    const meetupsCollection = db.collection(MONGO_COLLECTION);

    const result = await meetupsCollection.insertOne(data);

    console.log(`result`, result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
