const express = require('express');
const dotenv = require('dotenv')
// get config vars
dotenv.config();
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const router = express.Router();

//--------------------------------------------------------------------------------------------------

module.exports = (db) => {


  router.post("/login", async (req, res) => {

    // console.log("Login req.body", req.body);


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

        const accessToken = jwt.sign({
          id: user.id,
          username: user.username
        }, process.env.ACCESS_TOKEN_SECRET)


        res.json({accessToken})

      } else {
        res.send('Not Allowed');
      }
    } catch {
      res.status(500).send();
    }

  });

  //------------------------------------------------------------------------------------------------

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }



  //-------------------------------------------------------------------------------------------------------

  //-- Register ---

  router.post("/register", (req, res) => {
    // console.log("Register body", req.body);

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

          // console.log("password", req.body.pass);

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
console.log("user", user)
        res.json(user);
    })
  });



  return router;
};
