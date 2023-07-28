const User = require("../db/models/User");
const WalkRequest = require("../db/models/WalkRequest");
const Dog = require("../db/models/Dog")
const { authenticateToken } = require('../middleware/authenticate');

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

  router.get("/users/:id/dogs", authenticateToken, (req, res) => {

    const userId = req.params.id;
    console.log('userId', userId);
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.json({message:'No User Found!'})
        }
        console.log("userid", user.id);
        Dog.findAll({
          where: {
            userId: user.id
          }
        })
          .then((dogs) => {
            console.log(dogs);
          res.json(dogs)
        })
    })
  });

  return router;
};
