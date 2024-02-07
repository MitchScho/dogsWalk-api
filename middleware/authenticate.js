const dotenv = require('dotenv')
// --- get config vars ---
dotenv.config();
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("JWT Error", err)

    if (err) return res.sendStatus(403).send("Access denied. Invalid auth token...")

    req.user = user

    next()
  })
};


const isAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.sendStatus(403).send("Access Denied. Not authorized...");
    }
  })
};



module.exports = {authenticateToken, isAdmin};
