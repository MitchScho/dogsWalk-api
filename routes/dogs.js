
const router = require("express").Router();
const Dog = require('../db/funcModels/Dog')

module.exports = (db) => {
  router.get("/dogs", (req, res) => {

    Dog.findAll()
      .then((dogs) => {
        res.json(dogs);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/test", (req, res) => {
    console.log("Hi Test");
    Dog.findAll()
      .then((dogs) => {
        console.log(dogs)
        res.json({ message: "Hi i'm a Test" })
      })
  })



  return router;
};

