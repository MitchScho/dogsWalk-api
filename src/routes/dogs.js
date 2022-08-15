
const router = require("express").Router();

module.exports = (db) => {
  router.get("/dogs", (req, res) => {

    console.log("dogs route hit");

    db.query(`SELECT * FROM dogs;`)
      .then((data) => {
        const dogs = data.rows;
        res.json(dogs);
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

