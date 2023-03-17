const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
//--- Model Imports ---
const User = require("../db/models/User");
//--- Helper Imports ---
const {authenticateToken} = require('../middleware/authenticate');
const genAuthToken = require('../helpers/genAuthToken');

//--------------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.post("/login", async (req, res) => {

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (!user) {
      return res.status(400).send("No User Exists");
    }
    try {

      if (await bcrypt.compare(req.body.password, user.password)) {

        const accessToken = genAuthToken(user);

        res.json({ accessToken, user });

      } else {
        res.status(400).send('Not Allowed');
      }
    } catch {
      res.status(500).send();
    }
  });

  //-------------------------------------------------------------------------------------------------------

  router.post("/register", (req, res) => {

    User.findOne({
        where: {
          username: req.body.userName
        }
      })
      .then((user) => {
        if (user) {
          res.send("User already exists");
        }
        if (!user) {

          bcrypt.hash(req.body.pass, 10, function (err, hash) {

            User.create({
                username: req.body.userName,
                email: req.body.email,
                password: hash
              })
              .then(() => {
                console.log('New User Created');
              })
              .catch((err) => console.log(err.message))
          });
        }
      })
  });



  //-----------------------------------------------------------------------------------------------------------------------------

  router.get("/me", authenticateToken, (req, res) => {

    User.findOne({
        where: {
          id: req.user.id,
        }
      })
      .then((user) => {
        res.json(user);
      })
  });

  return router;
};
