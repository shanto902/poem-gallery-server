require("dotenv").config();
const express = require("express");
const cors = require("cors");
const poemRoutes = require("./routes/poemRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", poemRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(port, () => {
  console.log("App is listening on port :", port);
});
