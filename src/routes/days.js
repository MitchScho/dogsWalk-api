const router = require("express").Router();

module.exports = db => {
  router.get("/days", (request, response) => {
    console.log("days get request");

    db.query(

      `SELECT * FROM days`

    )
      .then((res) => {
      console.log("res", res);
      console.log('promise reponse from server');
      response.json(days);
    })
      .catch((err) => {
        console.log('queryError');
      console.log(err.message);
    })
  });

  return router;
};
