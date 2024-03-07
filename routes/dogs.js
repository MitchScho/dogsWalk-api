
const router = require("express").Router();
const { authenticateToken } = require('../middleware/authenticate');
// --- Models ---
const Dog = require('../db/models/Dog');
 //------------------------------------------------------------------------------
module.exports = (db) => {
  router.get("/dogs", (req, res) => {

    Dog.findAll()
      .then((dogs) => {
        res.json(dogs);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //------------------------------------------------------------------------------

  router.put("/dogs/:id", async (req, res) => {

    const image = req.body.image;
    const name = req.body.name;
    const dog = await Dog.findByPk(req.params.id);
    await dog.update({image, name});
    await dog.save();

    res.json(dog);
  });
  //------------------------------------------------------------------------------

  router.delete("/dogs/:id", authenticateToken, async (req, res) => {

    const dog = await Dog.findByPk(req.params.id)
      await dog.destroy();
    res.json();
  });

//-------------------------------------------------------------------------------
  //--- Test Route ---
  router.get("/test", (req, res) => {
    console.log("Hi Test");
    Dog.findAll()
      .then((dogs) => {
        //console.log(dogs)
        res.json({ message: "Hi i'm a Test" })
      });
  });

  return router;
};

