const router = require("express").Router();
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const { isAdmin } = require("../../middleware/authenticate");
const moment = require('moment');
moment().format();
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');
const WalkRequest = require('../../db/models/WalkRequest');
const WalkDog = require("../../db/models/WalkDog");
//-------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.get("/admin/walks-requests", isAdmin, (req, res) => {

    WalkRequest.findAll({
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



  router.put("/admin/walks-requests/:id", isAdmin, async (req, res) => {

    const id = req.params.id;
    const payload = req.body;

    const walkRequest = await WalkRequest.findByPk(id, {
      include: Dog
    });

    const isAccepted = payload.isAccepted !== undefined ? payload.isAccepted : walkRequest.isAccepted;
    const payedFor = payload.payedFor !== undefined ? payload.payedFor : walkRequest.payedFor;

    walkRequest.isAccepted = isAccepted
    walkRequest.payedFor = payedFor;

    await walkRequest.save();

    const approved = walkRequest.isAccepted && payload.isAccepted;

    if (approved) {

      let walk = await Walk.findOrCreate({
        where: {
          date: moment(walkRequest.date).startOf('day').toDate(), // use moment to compare dates and convert to Date object
        },
        include: Dog
      });

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.create({
        walkId: walk[0].dataValues.id,
        dogId: dog.id
      })))

      // const userPhone = '+12502539813' //updatedWalk.user.phoneNumber;
      // const userDog = walk.dogs[0].name;

      // client.messages
      //   .create({
      //     body: `Kelsey has accepted your dog walk request for ${userDog}.`,
      //     from: '+13087734330',
      //     to: userPhone,
      //   })
      //   .then(message => console.log(message.sid));

    } else {
        const walk = await Walk.findOne({
        where: {
          date: moment(walkRequest.date).startOf('day').toDate(), // use moment to compare dates and convert to Date object
        }
      })

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.destroy({
        where: {
        walkId: walk.id,
        dogId: dog.id
      }})))
    }

    return res.json(walkRequest);


  });


  router.get("/admin/walks-requests/:id", isAdmin, (req, res) => {

    const id = req.params.id;

    WalkRequest.findByPk(id, {
        include: Dog
      })
      .then((walkRequest) => {
        res.json(walkRequest);
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
