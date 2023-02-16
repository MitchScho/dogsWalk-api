const router = require("express").Router();
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../db/models/Walk');
const Dog = require('../db/models/Dog');
const WalkDog = require('../db/models/WalkDog');

//-------------------------------------------------------------------------------------------

module.exports = (db) => {
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

  //---------------------------------------------------------------------------------
  //---Twilio ----
  const client = require('twilio')("ACaca7aaf27930135c91101895427a47a1", "d822ce3d49fe76de018fdd9f16e97c24");


  //-------------------------------------------------------------------------
  router.post("/walks", (req, res) => {

    const date = req.body.date;
    const dogs = req.body.selectedDogs;

    Walk.create({
        date: date
      })

      .then((walk) => {

        const inserts = dogs.map((dog) =>
          WalkDog.create({
            walkId: walk.dataValues.id,
            dogId: dog.id
          }))
        Promise.all(inserts)
          .then(() => {

            Walk.findByPk(walk.dataValues.id, {
                include: Dog
              })
              .then((createdWalk) => {

                // const adminPhone = look up user with type admin
                res.json(createdWalk);
                
                client.messages
                .create({
                  body: 'Requested Dog Walk from Mitchell?',
                  from: '+13087734330',
                  to: '+61421072309',
                })
                .then(message => console.log(message.sid));
                
              })
          })
      })

  });

//   router.get("/walks", authenticationToken, (req, res) => {
//   res.json
// })


  router.delete("/walks/:id", (req, res) => {


    Walk.findByPk(req.params.id, {
        include: Dog
      })
      .then((walk) => {
        walk.destroy()
          .then(() => {
            res.json();
          })

      })

  });

  return router;
};
