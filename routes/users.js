const User = require("../db/models/User");

const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {

    User.findAll()
      .then((users) => {
        
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
