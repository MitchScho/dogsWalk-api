const { authenticateToken } = require('../middleware/authenticate');
// --- Models ---
const Dog = require("../db/models/Dog")
const User = require("../db/models/User");

const router = require("express").Router();

module.exports = (db) => {

  router.get("/users/:id", (req, res) => {

        User.findOne({
          where: {
            id: req.params.id,
          }
        })
        .then((user) => {

          res.json(user);
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/users/:id/dogs", authenticateToken, (req, res) => {

    const userId = req.params.id;

    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.json({message:'No User Found!'})
        }

        Dog.findAll({
          where: {
            userId: user.id
          }
        })
          .then((dogs) => {

          res.json(dogs)
        })
      })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err.message
        });
    });
  });

  router.post("/users/:id/dogs", authenticateToken, (req, res) => {
    const userId = req.params.id;
    const dogName = req.body.name;

    const dog = Dog.create({
      userId: userId,
      name: dogName
    })

    res.json(dog);
  });

  return router;
};
