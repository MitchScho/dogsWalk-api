const router = require("express").Router();
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');

//-------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.get("/admin/walks", (req, res) => {

    Walk.findAll({
      where: {
        isAccepted: null
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

    console.log("walks id req", req.body);
    // const isAccepted = req.body.isAccepted;
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
