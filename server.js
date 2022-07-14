// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.DB_PORT || 8080;
const db = require("./lib/db")
const express = require("express");
const app = express();
const morgan = require("morgan");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));


app.use(express.urlencoded({ extended: true }));



// app.use(express.static("public"));

 // Separated Routes for each Resource
const days = require("./routes/days")
// // Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");

// // Mount all resource routes
app.use("/api", days(db));
// // Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// // Note: mount other resources here, using the same pattern above

// // Home page
// // Warning: avoid creating more routes in this file!
// // Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get('*', (req, res) => {
  res.redirect(404, "/");
});

app.listen(PORT, () => {
  console.log(`dogsWalk-api app listening on port ${PORT}`);
});
