const router = require("express").Router();
const {
  Op
} = require("sequelize");
const {
  Sequelize
} = require("sequelize");
const {
  isAdmin
} = require("../../middleware/authenticate");
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

  //-------------------------------------------------------------------------------------------------------------

  router.get("/admin/unpaid-requests", isAdmin, (req, res) => {

    WalkRequest.findAll({
        where: {
        // paidFor: false,
        isAccepted: true,
        },
        include: Dog
      })
      .then((unPaidRequests) => {

        res.json(unPaidRequests);
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

    // console.log('payload ==>', payload);

    const walkRequest = await WalkRequest.findByPk(id, {
      include: Dog
    });

    const isAccepted = payload.isAccepted !== undefined ? payload.isAccepted : walkRequest.isAccepted;
    const paidFor = payload.paidFor !== undefined ? payload.paidFor : walkRequest.paidFor;

    // console.log('is accepted', isAccepted);
    // console.log('is paid for', paidFor);

    if (!isAccepted && paidFor) {
      walkRequest.paidFor = false;
      await walkRequest.save();
      return res.status(400).json({
        error: 'Walk request must be accepted for payment to occur!'
      });
    }

    walkRequest.isAccepted = isAccepted
    walkRequest.paidFor = paidFor;

    await walkRequest.save();

    const approved = walkRequest.isAccepted && payload.isAccepted;

    if (approved) {

      let walk = await Walk.findOrCreate({
        where: {
          date: moment(walkRequest.date).startOf('day').toDate(), // moment to compare dates and convert to Date object
        },
        include: Dog
      });

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.create({
        walkId: walk[0].dataValues.id,
        dogId: dog.id
      })));

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
          date: moment(walkRequest.date).startOf('day').toDate(), // moment to compare dates and convert to Date object
        }
      });

      // console.log('walk for delete', walk);

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.destroy({
        where: {
          walkId: walk.id,
          dogId: dog.id
        }
      })));

      // Count the number of dogs associated with the walk
      const dogCount = await walk.countDogs();

      // Delete the walk if the dog count is zero
      if (dogCount === 0) {
        await walk.destroy();
      }
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

  router.delete("/admin/walks-requests", isAdmin, async (req, res) => {

    await WalkRequest.destroy({
      where: {
              isAccepted: true,
              paidFor: true
        },
        include: Dog
    })
    res.send('Requests Deleted')
  })

  return router;
};
