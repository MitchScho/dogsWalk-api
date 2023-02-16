//----- load .env data into process.env --------------------------------------------------------------
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
// const models = require('./db/models')
const bodyParser = require("body-parser");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

//---------------------------------------------------------

const app = express();

//----------------------------------------------------------------------------------------------------

//------ Test Sequelize connection -------

db.authenticate()
  .then(() => {
    console.log('Database connection established successfully with Sequelize.');
  })
  .catch((err) => {
    console.log(err.message);
  })

//----------------------------  MiddleWare  ------------------------------------------------------------------------

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",  // < - -   location of the react app we're connecting to
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
// app.use(session({
//   secret: "Thisisasecretstring",
//   resave: true,
//   saveUninitialized: true,
// }));
// app.use(cookieParser("Thisisasecretstring"))
// app.use(passport.initialize());
// app.use(passport.session());
// require('./passportConfig')(passport);
//-------------------------------------------------------

//--- Auth ---------



//------ Separated Routes for each Resource -----------------------------------------------------------
const walksRoutes = require("./routes/walks");
const usersRoutes = require("./routes/users");
const dogsRoutes = require("./routes/dogs");
//-----------------------------------------------------
const adminWalksRoutes = require("./routes/admin/walks");
//------------------------------------------------------
const authRoutes = require('./routes/auth');


//------ Mount all resource routes -------------------------------------------------------------------
app.use("/api", walksRoutes(db));
app.use("/api", usersRoutes(db));
app.use("/api", dogsRoutes(db));
//-------------------------------------------------------
//--- Admin ---
app.use("/api", adminWalksRoutes(db));
//-------------------------------------------------------
//--- Auth ---
app.use("/api", authRoutes(db));


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
