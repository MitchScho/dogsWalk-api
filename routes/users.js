const User = require("../db/models/User");
const WalkRequest = require("../db/models/WalkRequest");
const Dog = require("../db/models/Dog")

const router = require("express").Router();

module.exports = (db) => {

  router.get("/users/:id", (req, res) => {

    WalkRequest.findByPk(req.params.id, {
      include: Dog
    })
      .then((walkRequest) => {

        User.findOne({
          where: {
            id: walkRequest.userId
          }
        })
        .then((user) => {

          res.json(user);
        })
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
