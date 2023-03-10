const dotenv = require('dotenv')
// --- get config vars ---
dotenv.config();
const jwt = require('jsonwebtoken');

const genAuthToken = (user) => { 
  const accessToken = jwt.sign({
    id: user.id,
    username: user.username,
    role: user.role
  },
    process.env.ACCESS_TOKEN_SECRET
  );
  return accessToken;
};

module.exports = genAuthToken;