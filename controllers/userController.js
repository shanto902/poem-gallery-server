const { createToken } = require("../middleware/auth");
const { ObjectId } = require("mongodb");

async function createUser(req, res, userCollection) {
  const user = req.body;

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
}

async function getUserById(req, res, userCollection) {
  const id = req.params.id;
  const result = await userCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
}

async function getUserByEmail(req, res, userCollection) {
  const email = req.params.email;
  const result = await userCollection.findOne({ email });
  res.send(result);
}

async function updateUserByEmail(req, res, userCollection) {
  const email = req.params.email;
  const userData = req.body;

  const result = await userCollection.updateOne(
    { email },
    { $set: userData },
    { upsert: true }
  );
  res.send(result);
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserByEmail,
};
