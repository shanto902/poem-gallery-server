require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  await client.connect();
  const poemDB = client.db("poemDB");
  const userDB = client.db("userDB");
  return {
    poemCollection: poemDB.collection("poemCollection"),
    userCollection: userDB.collection("userCollection"),
  };
}

module.exports = connectDB;
