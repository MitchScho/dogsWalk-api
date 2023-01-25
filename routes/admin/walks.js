const router = require("express").Router();
const {
  Op
} = require("sequelize");
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');

//-------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.get("/admin/walks", (req, res) => {

    Walk.findAll({
        where: {
          [Op.or]: [{
              isAccepted: null
            },
            {
              payedFor: null
            },
          ]
        },
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



  router.put("/admin/walks/:id", (req, res) => {

    const id = req.params.id;

    Walk.update(req.body, {
        where: {
          id: id
        }
      })
      .then(() => {
        Walk.findByPk(id, {
            include: Dog
          })
          .then((updatedWalk) => {
            console.log("Hello Hello")

            console.log("updatedWalk  = = = =>", updatedWalk.dogs[0].name);

            const userPhone = '+61421072309' //updatedWalk.user.phoneNumber;
            const userDog = updatedWalk.dogs[0].name;
            client.messages
              .create({
                body: `Kelsey has accepted your dog walk request for ${userDog}.`,
                from: '+13087734330',
                to: userPhone,
              })
              .then(message => console.log(message.sid));

            res.json(updatedWalk);
          })

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


  router.get("/admin/walks/:id", (req, res) => {
    // console.log("body", req.body);
    const id = req.params.id;

    Walk.findByPk(id, {
        include: Dog
      })
      .then((walk) => {
        res.json(walk);
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
