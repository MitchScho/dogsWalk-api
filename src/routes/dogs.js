
const router = require("express").Router();
const Dog = require('../models/Dog')

module.exports = (db) => {
  router.get("/dogs", (req, res) => {

    console.log("dogs route hit");

    Dog.findAll()

    // db.query(`SELECT * FROM dogs;`)

      .then((dogs) => {
        console.log("dogs from db response", dogs);
        // const dogs = data.rows;
        res.json(dogs);
        // res.send(dogs);



        // res.json(
        //   dogs.reduce(
        //     (previous, current) => ({ ...previous, [current.id]: current }),
        //     {}
        //   )
        // );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

