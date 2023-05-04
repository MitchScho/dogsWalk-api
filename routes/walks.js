const router = require("express").Router();
const {
  Op
} = require("sequelize");
 //--------------------------------------------------------------------------------------
  const Walk = require('../db/models/Walk');
  const Dog = require('../db/models/Dog');
const WalkRequest = require("../db/models/WalkRequest");
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

//-----------------------------------------------------------------------------------------

  router.get("/walks-dogs/:id", async(req, res) => {

    // console.log("id ===>>", req.params.id);

    const walkRequest = await WalkRequest.findByPk(req.params.id)

    // console.log("walk request date", walkRequest.dataValues.date);

    const walkRequestDate = new Date(walkRequest.dataValues.date)

    const walk = await Walk.findOne({
      where: {
        date: walkRequestDate
      }
    })
    // const walks = await Walk.findAll({
    //   where: {
    //     date: {
    //       [Op.between]: [walkRequestDate, new Date(walkRequestDate.getTime() + 24 * 60 * 60 * 1000)],
    //     }

    //   },
    //   include: Dog
    // })
    // console.log('walk with dogs', walk);
  return res.json(walk)
  });

  return router;
};
