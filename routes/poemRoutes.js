const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  addComment,
  getComments,
  getPoets, // Import getPoets from poemController
} = require("../controllers/poemController");

const connectDB = require("../config/db");

connectDB().then(({ poemCollection, userCollection }) => {
  router.post("/poem", verifyToken, (req, res) =>
    createPoem(req, res, poemCollection)
  );
  router.get("/poems", (req, res) => getAllPoems(req, res, poemCollection));
  router.get("/poem/:id", (req, res) => getPoemById(req, res, poemCollection));
  router.patch("/poem/:id", verifyToken, (req, res) =>
    updatePoem(req, res, poemCollection)
  );
  router.delete("/poem/:id", verifyToken, (req, res) =>
    deletePoem(req, res, poemCollection)
  );
  router.post("/poem/:id/comment", (req, res) =>
    addComment(req, res, poemCollection)
  );
  router.get("/poem/:id/comments", (req, res) =>
    getComments(req, res, poemCollection)
  );
  router.get("/poets", async (req, res) => {
    await getPoets(req, res, poemCollection, userCollection);
  });
});

module.exports = router;
