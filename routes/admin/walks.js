const router = require("express").Router();
const { Op } = require("sequelize");
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');

//-------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.get("/admin/walks", (req, res) => {

    Walk.findAll({
      where: {
        [Op.or]: [
          {isAccepted: null},
          {payedFor: null},
      ]
      },
      include: Dog
    })
      .then((walks) => {
        console.log("walks", walks);
        res.json(walks);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
        console.log('Query Error.....');
      })
  });


  router.put("/admin/walks/:id", (req, res) => {

    const id = req.params.id;

    Walk.update(req.body,
      {
        where: {
          id: id
        }
      })
      .then(() => {
        Walk.findByPk(id, { include: Dog })
          .then((updatedWalk) => {
            res.json(updatedWalk)
          })

      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
        console.log('Query Error.....');
      })
  });



  return router;
};
