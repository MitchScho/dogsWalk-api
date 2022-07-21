const router = require("express").Router();

module.exports = db => {
  router.get("/days", (request, response) => {
    console.log("days get request");
    console.log("db", db);

    db.query(

      `SELECT * FROM days`

    )
      .then((res) => {
        console.log("res =====>", res);
        console.log('promise reponse from server');
        response.json(res.rows);
    })
      .catch((err) => {
        console.log('Query Error.....');
        //console.log(err.message);
      })
  });

  return router;
};
