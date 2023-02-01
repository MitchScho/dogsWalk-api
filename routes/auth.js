const express = require('express');
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// router.get('/login', function (req, res, next) {
//   res.render('auth');
// });

// module.exports = router;

module.exports = (db) => {

  router.post("/login", (req, res) => {

    console.log(req.body);

    // User.findAll()
    //   .then((users) => {

    //     res.json(users);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({
    //         error: err.message
    //       });
    res.json({
      message: "Hi i'm a login message"
    })
  });

  router.post("/register", (req, res) => {
    console.log(req.body);

    User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user) {
          res.send("User already exists");

        }
        if (!user) {

          console.log("password", req.body.pass);

          const hashPassword = async () => {
            try {
              const hashedPassword = await bcrypt.hash(req.body.pass, 10)
              return hashedPassword

            }
            catch (err) {
              return err;
            }
          }

          // console.log("hashedPassword", hashedPassword);

          User.create({
              name: req.body.name,
              email: req.body.email,
              password: hashPassword
            })
            .then((res) => {
              console.log('New User Created');
            })
            .catch((err) => console.log(err.message))
        }
      })


    res.json({
      message: "Hi i'm a register message"
    })

  });

  // router.get("/user", (req, res) => {

  // });



  return router;
};
