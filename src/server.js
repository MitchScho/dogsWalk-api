// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.DB_PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();


// const fs = require("fs");
// const path = require("path");
// const bodyparser = require("body-parser");
// const helmet = require("helmet");
// const cors = require("cors");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));






// Separated Routes for each Resource
const days = require("./routes/days");
// // Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");

// // Mount all resource routes
 app.use("/api", days(db));
// //Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// // Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   res.render("index");
// });

//   function read(file) {
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         file,
//         {
//           encoding: "utf-8"
//         },
//         (error, data) => {
//           if (error) return reject(error);
//           resolve(data);
//         }
//       );
//     });
//   }


// module.exports = function application(ENV) {

//    app.use(cors());
//    app.use(helmet());
//    app.use(bodyparser.json());

//   app.use("/api", days(db));

//     Promise.all([
//       read(path.resolve(__dirname, `db/schema/create.sql`)),
//       read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
//     ])
//       .then(([create, seed]) => {
//         app.get("/api/debug/reset", (request, response) => {
//           db.query(create)
//             .then(() => db.query(seed))
//             .then(() => {
//               console.log("Database Reset");
//               response.status(200).send("Database Reset");
//             });
//         });
//       })
//       .catch(error => {
//         console.log(`Error setting up the reset route: ${error}`);
//       });


//   app.close = function () {
//     return db.end();
//   };

//   return app;
// };



app.get('*', (req, res) => {
  res.redirect(404, "/");
});

app.listen(PORT, () => {
  console.log(`dogsWalk-api app listening on port ${PORT}`);
});



