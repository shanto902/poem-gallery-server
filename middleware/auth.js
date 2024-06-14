const jwt = require("jsonwebtoken");

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
  try {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verify?.email) {
      return res.status(401).send("You are not authorized");
    }
    req.user = verify.email;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

module.exports = { createToken, verifyToken };
