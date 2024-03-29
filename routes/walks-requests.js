const router = require("express").Router();
//----- Models ------
const WalkRequestDog = require('../db/models/WalkRequestDog');
const Dog = require('../db/models/Dog');
const WalkRequest = require('../db/models/WalkRequest');
//-------------------------------------------------------------------------------------------

module.exports = (db) => {
  router.get("/walks-requests", (req, res) => {

    WalkRequest.findAll({
        include: Dog
      })
      .then((walkRequests) => {

        res.json(walkRequests);
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
  router.post("/walks-requests", (req, res) => {

    const date = req.body.date;
    const user = req.body.user;
    const dogs = req.body.selectedDogs;

    WalkRequest.create({
      date: date,
      userId: user.id,
      paidFor: false,
      isAccepted: false
      })
      .then((walkRequest) => {

        const walkRequestDogs = dogs.map((dog) =>
          WalkRequestDog.create({
            walkRequestId: walkRequest.dataValues.id,
            dogId: dog.id
          }))
        Promise.all(walkRequestDogs)
          .then(() => {

            WalkRequest.findByPk(walkRequest.dataValues.id, {
                include: Dog
              })
              .then((walkRequest) => {

                // const adminPhone = look up user with type admin
                res.json(walkRequest);

                client.messages
                .create({
                  body: 'Requested Dog Walk from Mitchell?',
                  from: '+13087734330',
                  to: '+12502539813',
                })
                .then(message => console.log(message.sid));

              })
          })
      })

  });
  //------------------------------------------------------------------------------

  router.delete("/walks-requests/:id", (req, res) => {

    WalkRequest.findByPk(req.params.id, {
        include: Dog
      })
      .then((walkRequest) => {
        walkRequest.destroy()
          .then(() => {
            res.json();
          })
      })
  });

  return router;
};
