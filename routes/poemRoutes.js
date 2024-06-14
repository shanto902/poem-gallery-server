const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
} = require("../controllers/poemController");

const connectDB = require("../config/db");

connectDB().then(({ poemCollection }) => {
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
});

module.exports = router;
