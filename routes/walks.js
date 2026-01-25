const router = require("express").Router();
const {
  Op
} = require("sequelize");
 // --- Models ---
const Walk = require('../db/models/Walk');
const Dog = require('../db/models/Dog');
const User = require('../db/models/User');
//-----------------------------------------------------------------------------------------

module.exports = (db) => {
//-----------------------------------------------------------------------------------------
  // Associations are now defined in db/associations.js and loaded in server.js
  // No need to define them here anymore

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
      console.log('Query Error.....', err);
      console.log('Error stack:', err.stack);
    })
  });

  return router;
};
