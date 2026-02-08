const router = require("express").Router();
const {
  isAdmin
} = require("../../middleware/authenticate");
const moment = require('moment');
const { Op } = require('sequelize');
moment().format();
//-----------------------------------------------------------------------------------------
//----- Models ------
const Walk = require('../../db/models/Walk');
const Dog = require('../../db/models/Dog');
const User = require('../../db/models/User');
const WalkRequest = require('../../db/models/WalkRequest');
const WalkDog = require("../../db/models/WalkDog");
const WalkRequestDog = require("../../db/models/WalkRequestDog");
const { json } = require("body-parser");
//-------------------------------------------------------------------------------------------

module.exports = (db) => {
  // Associations are now defined in db/associations.js and loaded in server.js
  // Ensure User.hasMany(Dog) is set up for nested includes
  try {
    if (!User.associations || !User.associations.dogs) {
      User.hasMany(Dog, { foreignKey: 'userId' });
    }
  } catch (err) {
    // Association might already be defined, ignore error
    if (!err.message || !err.message.includes('already been defined')) {
      console.warn('Could not set up User.hasMany(Dog) in routes:', err.message);
    }
  }

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
  router.get("/admin/walks-requests/dogs/:id", isAdmin, (req, res) => {

    WalkRequest.findAll({
      include: [{
        model: Dog,
        where: {id: req.params.id}
      }],
       where: {paidFor: false}
    }).then((walkRequest) => {
      if (walkRequest) {
        console.log("DOG FOUND: ", walkRequest)
        res.json(walkRequest)
      }
      else {
        console.log("DOG NOT FOUND")
      }
    })
  });

  //-------------------------------------------------------------------------------------------------------------

  router.get("/admin/unpaid-walks", isAdmin, async (req, res) => {
    try {
      // Get all unpaid walks with their dogs and users
      // Note: This endpoint returns unpaid WALKS (not walk requests)
      const unpaidWalks = await Walk.findAll({
        where: {
          paidFor: false,
        },
        include: [{
          model: Dog,
          required: false,
          include: [{
            model: User,
            required: false,
            attributes: ['id', 'username', 'email'], // Only get needed user fields
          }],
        }],
      });

      // Group walks by user
      const walksByUser = {};
      
      unpaidWalks.forEach((walk) => {
        walk.dogs.forEach((dog) => {
          if (dog.user) {
            const userId = dog.user.id;
            const userName = dog.user.username || dog.user.email;
            
            if (!walksByUser[userId]) {
              walksByUser[userId] = {
                userId,
                userName,
                dogs: [],
                walks: [],
              };
            }
            
            // Add dog if not already in the list
            const dogExists = walksByUser[userId].dogs.some(d => d.id === dog.id);
            if (!dogExists) {
              walksByUser[userId].dogs.push({
                id: dog.id,
                name: dog.name,
                image: dog.image,
                address: dog.address,
              });
            }
            
            // Add walk if not already in the list
            const walkExists = walksByUser[userId].walks.some(w => w.id === walk.id);
            if (!walkExists) {
              walksByUser[userId].walks.push({
                id: walk.id,
                date: walk.date,
                paidFor: walk.paidFor,
              });
            }
          }
        });
      });

      // Convert to array format
      const result = Object.values(walksByUser);
      
      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error in /admin/unpaid-walks:', err);
      console.log('Error stack:', err.stack);
    }
  });

  //---------------------------------------------------------------------------------

  //---Twilio ----
  const client = require('twilio')("ACaca7aaf27930135c91101895427a47a1", "d822ce3d49fe76de018fdd9f16e97c24");

 //------------------------------------------------------------------------------

  router.put("/admin/walks-requests/:id", isAdmin, async (req, res) => {

    const id = req.params.id;
    const payload = req.body;

    const walkRequest = await WalkRequest.findByPk(id, {
      include: Dog
    });

    const isAccepted = payload.isAccepted !== undefined ? payload.isAccepted : walkRequest.isAccepted;

    if (!isAccepted && payload.paidFor) {
      return res.status(400).json({
        error: 'Walk request must be accepted for payment to occur!'
      });
    }

    walkRequest.isAccepted = isAccepted;
    await walkRequest.save();

    const approved = walkRequest.isAccepted && payload.isAccepted;

    // console.log("ISAPPROVED FLAG: ", approved, walkRequest.isAccepted, req.body)
    if (approved) {

      let walk = await Walk.findOrCreate({
        where: {
          date: moment(walkRequest.date).startOf('day').toDate(), // moment to compare dates and convert to Date object
        },
        include: Dog,
        defaults: {
          paidFor: false, // Default to unpaid when walk is created
        }
      });

      // Update paidFor on Walk if provided in payload
      if (payload.paidFor !== undefined) {
        walk[0].paidFor = payload.paidFor;
        await walk[0].save();
      }

      await Promise.all(walkRequest.dogs.map(dog => WalkDog.findOrCreate({
        where: {
          walkId: walk[0].dataValues.id,
            dogId: dog.id
        }
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

      if (walk) {
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
    }

    // If walk request is already accepted and we're just updating paidFor, update the Walk
    // This handles the case where paidFor is updated on an already-accepted walk request
    if (walkRequest.isAccepted && payload.paidFor !== undefined && payload.isAccepted === undefined) {
      const walk = await Walk.findOne({
        where: {
          date: moment(walkRequest.date).startOf('day').toDate(),
        },
      });

      if (walk) {
        walk.paidFor = payload.paidFor;
        await walk.save();
      }
    }

    return res.json(walkRequest);

  });

  //------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------

  router.delete("/admin/walks-requests", isAdmin, async (req, res) => {
    // Note: This endpoint deletes paid walk requests
    // Since paidFor is now on Walk, this may need to be updated in the future
    await WalkRequest.destroy({
      where: {
        isAccepted: true,
        paidFor: true
      },
      include: Dog
    })
    res.send('Requests Deleted')
  })

  //------------------------------------------------------------------------------
  // Get all clients (users) with their dogs
  router.get("/admin/clients", isAdmin, async (req, res) => {
    try {
      const clients = await User.findAll({
        where: {
          role: 'client'
        },
        include: [{
          model: Dog,
        }],
        order: [['id', 'ASC']]
      });

      // Filter out clients with no dogs
      const clientsWithDogs = clients.filter(client => client.dogs && client.dogs.length > 0);

      res.json(clientsWithDogs);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error.....', err);
    }
  });

  //------------------------------------------------------------------------------
  // Get all walks with dogs and users for admin
  router.get("/admin/walks", isAdmin, async (req, res) => {
    try {
      // Get all unique dog IDs from walks first
      const walksWithDogs = await Walk.findAll({
        include: [{
          model: Dog,
          required: false,
          attributes: ['id', 'userId', 'name', 'address', 'image'],
        }],
        order: [['date', 'DESC']]
      });

      // Get all unique user IDs from the dogs
      const userIds = [...new Set(
        walksWithDogs
          .flatMap(walk => walk.dogs || [])
          .map(dog => dog.userId)
          .filter(id => id != null)
      )];

      // Fetch all users at once
      const users = userIds.length > 0 ? await User.findAll({
        where: {
          id: {
            [Op.in]: userIds,
          },
        },
        attributes: ['id', 'username', 'email'],
      }) : [];

      // Create a map of userId to user for quick lookup
      const userMap = {};
      users.forEach(user => {
        userMap[user.id] = user;
      });

      // Attach users to dogs
      walksWithDogs.forEach(walk => {
        if (walk.dogs) {
          walk.dogs.forEach(dog => {
            if (dog.userId && userMap[dog.userId]) {
              dog.dataValues.user = userMap[dog.userId];
            }
          });
        }
      });

      res.json(walksWithDogs);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error in /admin/walks:', err);
      console.log('Error message:', err.message);
      console.log('Error stack:', err.stack);
    }
  });

  //------------------------------------------------------------------------------
  // Update a walk's paidFor status
  router.put("/admin/walks/:id", isAdmin, async (req, res) => {
    try {
      const walkId = req.params.id;
      const { paidFor } = req.body;

      const walk = await Walk.findByPk(walkId);

      if (!walk) {
        return res.status(404).json({
          error: 'Walk not found'
        });
      }

      walk.paidFor = paidFor !== undefined ? paidFor : walk.paidFor;
      await walk.save();

      res.json(walk);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error in PUT /admin/walks/:id:', err);
    }
  });

  //------------------------------------------------------------------------------
  // Get walk history for a specific client (user)
  router.get("/admin/clients/:userId/walk-history", isAdmin, async (req, res) => {
    try {
      const userId = req.params.userId;

      // Get all walk requests for this user
      const walkRequests = await WalkRequest.findAll({
        where: {
          userId: userId
        },
        include: [{
          model: Dog,
        }],
        order: [['date', 'DESC']]
      });

      // Get all walks that include this user's dogs
      const userDogs = await Dog.findAll({
        where: {
          userId: userId
        }
      });

      const dogIds = userDogs.map(dog => dog.id);

      // Get walk IDs that have this user's dogs
      const walkDogs = await WalkDog.findAll({
        where: {
          dogId: {
            [Op.in]: dogIds
          }
        }
      });

      const walkIds = [...new Set(walkDogs.map(wd => wd.walkId))];

      const walks = await Walk.findAll({
        where: {
          id: {
            [Op.in]: walkIds
          }
        },
        include: [{
          model: Dog,
        }],
        order: [['date', 'DESC']]
      });

      // Combine walk requests and walks into a single history array
      const history = [];

      // Add walk requests
      walkRequests.forEach(wr => {
        history.push({
          id: wr.id,
          type: 'walkRequest',
          date: wr.date,
          isAccepted: wr.isAccepted,
          paidFor: wr.paidFor || false, // WalkRequest may not have paidFor anymore
          createdAt: wr.createdAt,
          dogs: wr.dogs
        });
      });

      // Add walks (only if they're associated with this user's dogs)
      walks.forEach(walk => {
        // Check if this walk has any of the user's dogs
        const hasUserDogs = walk.dogs.some(dog => dogIds.includes(dog.id));
        if (hasUserDogs) {
          history.push({
            id: walk.id,
            type: 'walk',
            date: walk.date,
            isAccepted: true, // Walks are always accepted (they come from accepted requests)
            paidFor: walk.paidFor || false,
            createdAt: walk.createdAt,
            dogs: walk.dogs.filter(dog => dogIds.includes(dog.id))
          });
        }
      });

      // Sort by date descending
      history.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json(history);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error.....', err);
    }
  });

  //------------------------------------------------------------------------------
  // Remove a dog from a walk
  router.delete("/admin/walks/:walkId/dogs/:dogId", isAdmin, async (req, res) => {
    try {
      const { walkId, dogId } = req.params;

      // Find the walk
      const walk = await Walk.findByPk(walkId, {
        include: [Dog]
      });

      if (!walk) {
        return res.status(404).json({
          error: 'Walk not found'
        });
      }

      // Remove the dog from the walk
      await WalkDog.destroy({
        where: {
          walkId: parseInt(walkId),
          dogId: parseInt(dogId)
        }
      });

      // Set paidFor to false when removing a dog (removes need for payment)
      walk.paidFor = false;
      await walk.save();

      res.json({ success: true, message: 'Dog removed from walk' });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
      console.log('Query Error in DELETE /admin/walks/:walkId/dogs/:dogId:', err);
    }
  });

  //------------------------------------------------------------------------------
  // Add a dog to a walk (creates walk request, accepts it, and adds to walk)
  router.post("/admin/walks/:walkId/dogs", isAdmin, async (req, res) => {
    try {
      const { walkId } = req.params;
      const { dogId, date } = req.body;

      console.log('POST /admin/walks/:walkId/dogs - Request body:', req.body);
      console.log('POST /admin/walks/:walkId/dogs - walkId:', walkId);
      console.log('POST /admin/walks/:walkId/dogs - dogId:', dogId, 'type:', typeof dogId);

      if (dogId === undefined || dogId === null || dogId === '') {
        return res.status(400).json({
          error: 'dogId is required'
        });
      }

      // Find or create the walk
      let walk;
      if (walkId === 'new') {
        if (!date) {
          return res.status(400).json({
            error: 'date is required when creating a new walk'
          });
        }
        // Create a new walk for the specified date
        const walkDate = moment(date).startOf('day').toDate();
        const [walkInstance] = await Walk.findOrCreate({
          where: {
            date: walkDate,
          },
          defaults: {
            paidFor: false,
            date: walkDate,
          }
        });
        walk = walkInstance;
      } else {
        // Find existing walk
        const parsedWalkId = parseInt(walkId, 10);
        if (isNaN(parsedWalkId)) {
          return res.status(400).json({
            error: 'Invalid walkId'
          });
        }
        walk = await Walk.findByPk(parsedWalkId, {
          include: [Dog]
        });

        if (!walk) {
          return res.status(404).json({
            error: 'Walk not found'
          });
        }
      }

      // Check if dog exists
      const dog = await Dog.findByPk(dogId);
      if (!dog) {
        return res.status(404).json({
          error: 'Dog not found'
        });
      }

      // Check if dog is already in the walk
      const existingWalkDog = await WalkDog.findOne({
        where: {
          walkId: walk.id,
          dogId: parseInt(dogId)
        }
      });

      if (existingWalkDog) {
        console.log('Dog already in walk - walkId:', walk.id, 'dogId:', dogId);
        return res.status(400).json({
          error: 'Dog is already in this walk'
        });
      }

      // Get the dog's user
      const dogUser = await User.findByPk(dog.userId);
      if (!dogUser) {
        return res.status(404).json({
          error: 'Dog owner not found'
        });
      }

      // Create a walk request for this dog on this date
      const walkRequest = await WalkRequest.create({
        date: walk.date,
        userId: dogUser.id,
        isAccepted: true, // Auto-accept since admin is adding
        paidFor: false // Don't mark as paid yet
      });

      // Add dog to walk request
      await WalkRequestDog.create({
        walkRequestId: walkRequest.id,
        dogId: parseInt(dogId)
      });

      // Add dog to the walk
      await WalkDog.create({
        walkId: walk.id,
        dogId: parseInt(dogId)
      });

      res.json({ success: true, message: 'Dog added to walk', walkRequest, walk });
    } catch (err) {
      console.error('Query Error in POST /admin/walks/:walkId/dogs:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      res.status(500).json({
        error: err.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  });

  return router;
};
