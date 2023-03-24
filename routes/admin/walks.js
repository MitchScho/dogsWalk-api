const router = require("express").Router();
const {
  Op
} = require("sequelize");
const {
  isAdmin
} = require("../../middleware/authenticate");
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');
const WalkRequest = require('../../db/models/WalkRequest');
const WalkDog = require("../../db/models/WalkDog");
//-------------------------------------------------------------------------------------------

module.exports = (db) => {

  router.get("/admin/walks-requests", isAdmin, (req, res) => {

    console.log(" get admin walks");

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
    console.log("request body", req.body);
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

    console.log(" walk request after save", walkRequest);

    const approved = walkRequest.isAccepted;
    if (approved) {

      let walk = await Walk.findOrCreate({
        where: {
          date: walkRequest.date
        }

      });

      console.log(" walk request before adding dogs", walkRequest);
      console.log("walk ", walk);
      // console.log("walk - dogs", dog.id)


      await Promise.all(walkRequest.dogs.map(dog => WalkDog.create({
        walkId: walk[0].dataValues.id,
        dogId: dog.id
      })))

      console.log(" walk after adding dogs", walk);

    } else {
        const walk = await Walk.findOne({
        where: {
          date: walkRequest.date
        }
      })

      console.log(" walk before deleting dogs", walk);

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.destroy({
        where: {
        walkId: walk.id,
        dogId: dog.id
      }})))

      console.log(" walk after deleting dogs", walk);
    }
    return res.json(walkRequest);


    // const walkRequest = await WalkRequest.findOne({




    //   where: {
    //     id: id
    //   }
    // })


    // const approve = req.body.isAccepted

    // if (approve) {
    //   await walkRequest.update({
    //     approved: true
    //   });

    //   let walk;
    //   walk = await Walk.findOne({
    //     where: {
    //       date: walkRequest.date
    //     }
    //   })

    //   if (!walk) {
    //     walk = Walk.create({
    //       date: date
    //     })
    // }

    //   await Promise.all(walkRequest.dogs.map(dog => WalkDog.create({
    //     walkId: walk.id,
    //     dogId: dog.id
    //   })))
    // } else {
    //   walkRequest.update({
    //     approved: false
    //   });
    // }

    // return res.json({
    // walkRequest: walkRequest
    // })
  });

  // WalkRequest.findOne({
  //       where: {
  //         id: id
  //       }
  //     })
  //     .then((walkRequest) => {

  //       if (req.body) {
  //         walkRequest.update(req.body)
  //       }

  //       Walk.findOne({
  //         where: {
  //           date: walkRequest.date
  //         }
  //       })
  //         .then((walk) => {

  //         if (!walk) {
  //           Walk.create({date: req.body.date })
  //         }
  //           const walkRequestDogs = walkRequest.dogs;
  //           walkRequestDogs.map(dog => WalkDog.create({ walkId: walk.dataValuesid, dogId: dog.id }))

  //           Promise.all(walkRequestDogs)(() => {

  //           })

  //       })


  //     })
  //     .catch((err) => {
  //       res
  //         .status(500)
  //         .json({
  //           error: err.message
  //         });
  //       console.log('Query Error.....');
  //     })

  //  Walk.findByPk(id, {
  //      include: Dog
  //    })
  //    .then((updatedWalk) => {

  //      res.json(updatedWalk);
  //    })

  // const userPhone = '+12502539813' //updatedWalk.user.phoneNumber;
  // const userDog = updatedWalk.dogs[0].name;
  // client.messages
  //   .create({
  //     body: `Kelsey has accepted your dog walk request for ${userDog}.`,
  //     from: '+13087734330',
  //     to: userPhone,
  //   })
  //   .then(message => console.log(message.sid));


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
