require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

function createToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES }
  );
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!verify?.email) {
    return res.send("You are not authorized");
  }
  req.user = verify.email;
  next();
}

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const poemDB = client.db("poemDB");
    const userDB = client.db("userDB");
    const poemCollection = poemDB.collection("poemCollection");
    const userCollection = userDB.collection("userCollection");

    // create a poem
    app.post("/poem", verifyToken, async (req, res) => {
      const bookData = req.body;
      const result = await poemCollection.insertOne(bookData);
      res.send(result);
    });

    // get all poems
    app.get("/poems", async (req, res) => {
      const booksData = poemCollection.find();
      const result = await booksData.toArray();
      res.send(result);
    });

    // get single poem
    app.get("/poem/:id", async (req, res) => {
      const id = req.params.id;
      const poemData = await poemCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(poemData);
    });

    // update poem
    app.patch("/poem/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await poemCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(result);
    });

    // delete a poem
    app.delete("/poem/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await poemCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // create an user
    app.post("/user", async (req, res) => {
      const user = req.body;
      console.log(req.body);
      const token = createToken(user);
      const isUserExist = await userCollection.findOne({ email: user?.email });
      if (isUserExist?._id) {
        return res.send({
          status: "success",
          message: "Login success",
          token,
        });
      }
      await userCollection.insertOne(user);
      return res.send({ token });
    });

    // get user using id

    app.get("/user/get/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const result = await userCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // get user using email

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    // update user using patch
    app.patch("/user/:email", async (req, res) => {
      const email = req.params.email;
      const userData = req.body;
      const result = await userCollection.updateOne(
        { email },
        { $set: userData },
        { upsert: true }
      );
      res.send(result);
    });

    console.log("Database is connected");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, (req, res) => {
  console.log("App is listening on port :", port);
});
