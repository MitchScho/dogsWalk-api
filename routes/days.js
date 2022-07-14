const router = require("express").Router();

module.exports = db => {
  router.get("/days", (request, response) => {
    console.log("days get request");
    db.query(
      `
      SELECT
        days.id,
        days.name,
        days.date
      FROM days
      GROUP BY days.id
      ORDER BY days.id
    `
    ).then(({ rows: days }) => {
      response.json(days);
    });
  });

  return router;
};
