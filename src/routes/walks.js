const router = require("express").Router();

module.exports = db => {
  router.get("/walks", (request, response) => {
    console.log("walks get request");
    console.log("db", db);

    db.query(

      `SELECT * FROM walks;`

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
