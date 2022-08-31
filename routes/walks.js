const router = require("express").Router();
const res = require("express/lib/response");
const Walk = require('../models/Walk');

module.exports = (db) => {
  router.get("/walks", (req, res) => {

    Walk.findAll()
      // db.query(

      //   `SELECT * FROM walks;`

      // )
      .then((walks) => {
        console.log('walks db response', walks);
        // res.sendStatus(200)

        // const walks = data.rows;
        res.json(walks);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
        console.log('Query Error.....');
        //console.log(err.message);
      })
  });


  router.post("/walks", (req, res) => {
    const date = req.body.date;
    const dogs = req.body.selectedDogs;
    console.log("date for post request", date);
    Walk.create({ date: date })
      .then((walk) => {
        const walk_id = walk.dataValues.id
        res.json(walk)
        console.log("walk create data", walk.dataValues);
      })
  
  })


  // router.post("/walks", (req, res) => {

  //   const date = req.body.date;
  //   const dogs = req.body.selectedDogs;

  //   db.query(`INSERT INTO walks(date) VALUES ('${date}') RETURNING id;`)
  //     .then((data) => {

  //       const walk_id = data.rows[0].id;
  //       const inserts = dogs.map((dog) =>
  //         db.query(`INSERT INTO walks_dogs (walk_id, dog_id) VALUES (${walk_id}, ${dog.id});`)
  //       )
  //       Promise.all(inserts)
  //         .then(() =>
  //           db.query(`
  //           SELECT walks.id AS walk_id, date, availible_spots, dogs.id AS dog_id, dogs.name, dogs.avatar
  //           FROM walks
  //           INNER JOIN walks_dogs
  //           ON walks.id = walks_dogs.walk_id
  //           INNER JOIN dogs
  //           ON dogs.id = walks_dogs.dog_id
  //           WHERE walks.id = ${walk_id} `))
  //         .then(data => {

  //           const walk = data.rows.reduce((walk, row) => {

  //             const dog = {
  //               id: row.dog_id,
  //               name: row.name,
  //               avatar: row.avatar
  //             }

  //             if (walk.dogs) {
  //               walk.dogs.push(dog)
  //             } else {
  //               walk.dogs = [dog]
  //             }

  //             return {
  //               id: row.walk_id,
  //               date: row.date,
  //               availible_spots: row.availible_spots,
  //               dogs: walk.dogs
  //             }
  //           }, {})
  //           res.json(walk);
  //         })
  //     })
  // })

  return router;
};

// router.get("/appointments", (request, response) => {
//   db.query(
//     `
//       SELECT
//         appointments.id,
//         appointments.time,
//         CASE WHEN interviews.id IS NULL
//         THEN NULL
//         ELSE json_build_object('student', interviews.student, 'interviewer', interviews.interviewer_id)
//         END AS interview
//       FROM appointments
//       LEFT JOIN interviews ON interviews.appointment_id = appointments.id
//       GROUP BY appointments.id, interviews.id, interviews.student, interviews.interviewer_id
//       ORDER BY appointments.id
//     `
//   ).then(({ rows: appointments }) => {
//     response.json(
//       appointments.reduce(
//         (previous, current) => ({ ...previous, [current.id]: current }),
//         {}
//       )
//     );
//   });
// });
