const router = require("express").Router();
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../db/funcModels/Walk');
const Dog = require('../db/funcModels/Dog');
const WalkDog = require('../db/funcModels/WalkDog');

//-------------------------------------------------------------------------------------------

module.exports = (db) => {
  router.get("/walks", (req, res) => {

    Walk.findAll({ include: Dog })
      .then((walks) => {

        res.json(walks);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
        console.log('Query Error.....');
      })
  });


  router.post("/walks", (req, res) => {

    const date = req.body.date;
    const dogs = req.body.selectedDogs;

    Walk.create({ date: date })

      .then((walk) => {

        const inserts = dogs.map((dog) =>
          WalkDog.create({
            walkId: walk.dataValues.id,
            dogId: dog.id
          }))
        Promise.all(inserts)
          .then((data) => {

            Walk.findByPk(walk.dataValues.id, { include: Dog })
              .then((createdWalk) => {
                res.json(createdWalk);
              })
          })
      })

  })

  return router;
};
