const express = require('express');
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
// const passport = require("passport");
// require('../passportConfig')(passport);
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();



const router = express.Router();

//--------------------------------------------------------------------------------------------------

module.exports = (db) => {


  // router.post("/login", passport.authenticate("local", (req, res) => {
  //   // res.json({ message: "Successfully Authenticated"})
  //   res.send("Successfully Authenticated");
  // }));

  //--------------------------------------------------------------------------------------------------------------

  //---Login example route from Passport---

  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
  // }));

  //------------------------------------------------------------------------------------------------

  router.post("/login", async (req, res) => {

    console.log("Login req.body", req.body);


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
          username: user.username
        }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ accessToken })
        
      } else {
        res.send('Not Allowed');
      }
    } catch {
      res.status(500).send();
    }



  });
  // function generateAccessToken(username) {
  //   return jwt.sign(username, process.env.TOKEN_SECRET, {
  //     expiresIn: '1800s'
  //   });
  // }

  // passport.authenticate("local", (err, user, info) => {
  //   console.log("User for authentication", user);
  //   console.log("authenticate error", err);
  //   if (err) throw err;
  //   if (!user) res.send("No User Exists");
  //   else {
  //     req.logIn(user, err => {
  //       if (err) throw err;
  //       res.send('Successfully Authenticated');
  //       console.log("Authenticated User", user)
  //     })
  //   }
  // })(req, res, next);

  // res.json({
  //   message: "Hi i'm a login message"
  // })

  //-------------------------------------------------------------------------------------------------------

  //-- Register ---

  router.post("/register", (req, res) => {
    console.log("Register body", req.body);

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

          console.log("password", req.body.pass);

          bcrypt.hash(req.body.pass, 10, function (err, hash) {

            User.create({
                username: req.body.userName,
                email: req.body.email,
                password: hash
              })
              .then((res) => {
                console.log('New User Created', res);
              })
              .catch((err) => console.log(err.message))
          });

        }
      })


    // res.json({
    //   message: "Hi i'm a register message"
    // })

  });

  //-----------------------------------------------------------------------------------------------------------------------------

  // router.get("/user", (req, res) => {

  // });



  return router;
};
