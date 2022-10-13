//----- load .env data into process.env --------------------------------------------------------------
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
// const models = require('./db/models')
const bodyParser = require("body-parser");
const cors = require("cors");
//----------------------------------------------------------------------------------------------------

//------ Test Sequelize connection --------------------------------------------------------------------

db.authenticate()
  .then(() => {
    console.log('Database connection established successfully with Sequelize.');
  })
  .catch((err) => {
    console.log(err.message);
  })

  //----------------------------------------------------------------------------------------------------
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json())


//------ Separated Routes for each Resource -----------------------------------------------------------
const walksRoutes = require("./routes/walks");
const usersRoutes = require("./routes/users");
const dogsRoutes = require("./routes/dogs");
//-----------------------------------------------------
const adminWalksRoutes = require("./routes/admin/walks");


//------ Mount all resource routes -------------------------------------------------------------------
app.use("/api", walksRoutes(db));
app.use("/api", usersRoutes(db));
app.use("/api", dogsRoutes(db));
//-------------------------------------------------------
app.use("/api", adminWalksRoutes(db));


app.get('*', (req, res) => {
  res.redirect(404, "/");
});


//------ Sync Models ------------------------------------------------------------------------------------
db.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");

  })

//-------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`dogsWalk-api app listening on port ${PORT}`);
});
