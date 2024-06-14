const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserByEmail,
} = require("../controllers/userController");

const connectDB = require("../config/db");

connectDB().then(({ userCollection }) => {
  router.post("/user", (req, res) => createUser(req, res, userCollection));
  router.get("/user/get/:id", (req, res) =>
    getUserById(req, res, userCollection)
  );
  router.get("/user/:email", (req, res) =>
    getUserByEmail(req, res, userCollection)
  );
  router.patch("/user/:email", (req, res) =>
    updateUserByEmail(req, res, userCollection)
  );
});

module.exports = router;
