const User = require("../models/User");

const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    User.findAll()
      .then((users) => {
        // const users = data.rows;
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
