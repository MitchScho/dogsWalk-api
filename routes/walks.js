const router = require("express").Router();
const {
  Op
} = require("sequelize");
 // --- Models ---
const Walk = require('../db/models/Walk');
const Dog = require('../db/models/Dog');
//-----------------------------------------------------------------------------------------

module.exports = (db) => {
//-----------------------------------------------------------------------------------------

  router.get("/walks", (req, res) => {

    Walk.findAll({
      include: Dog
    })
    .then((walks) => {

      res.json(walks);
    })
    .catch((err) => {
      res
      .status(500)
      .json({
        error: err.message
      });
      console.log('Query Error.....');
    })
  });

  return router;
};
