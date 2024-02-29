
const router = require("express").Router();
const { authenticateToken } = require('../middleware/authenticate');
// const multer = require('multer');
// --- Models ---
const Dog = require('../db/models/Dog');

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
  // const storage = multer.diskStorage({

  //   destination: (req, file, cb) => {
  //     console.log('file storage destination cb');
  //     cb(null, '../images/');
  //   },
  //   filename: (req, file, cb) => {
  //     console.log("file for storage", file);
  //     cb(null, file.originalname);
  //   }
  // });

  // const upload = multer({ storage });
  // console.log("upload", upload.storage);

  router.put("/dogs/:id", async (req, res) => {

    console.log("body ===>", req.body);

    console.log("image url", req.body.imageURL)
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

