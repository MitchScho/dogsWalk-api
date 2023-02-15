const User = require("./db/models/User");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  console.log("In Passport config")

  passport.use(
    new localStrategy((username, password, done) => {

      console.log("user password", password);
      console.log("user username", username);

      User.findOne({
          where: {
            username: username
          }
        })
        .then((err, user) => {

          console.log("user found", user);
          console.log("err found", err);

          if (err) throw err;
          if (!user) return done(null, false, {
            message: "No user found"
          });

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "User not verified"
              });
            }
          });
        });
    })
  );

  //---------------------------------------------------------------------------------------------------------------------------------------------------

  // //serialize
  // passport.serializeUser(function (user, done) {
  //   console.log("serialize user")
  //   done(null, user.id);
  // });

  // //deserialize user
  // passport.deserializeUser(function (id, done) {
  //   console.log("deserialize user")
  //   User.findByPk(id).then(function (user) {
  //     if (user) {
  //       done(null, user.get());
  //     } else {
  //       done(user.errors, null);
  //     }
  //   });
  // });

  //------------------------------------------------------------------------------------------------------------------------------------------------------


  // passport.use(new localStrategy(function verify(username, password, cb) {

  //   User.findOne({
  //     where: {
  //       username: username
  //     }
  //   })
  //  .then((err, row) => {
  
  //     console.log("user success");

  //     if (err) {
  //       return cb(err);
  //     }
  //     if (!row) {
  //       return cb(null, false, {
  //         message: 'Incorrect username or password.'
  //       });
  //     }

  //     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
  //       if (err) {
  //         return cb(err);
  //       }
  //       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
  //         return cb(null, false, {
  //           message: 'Incorrect username or password.'
  //         });
  //       }
  //       return cb(null, row);
  //     });
  //   });
  // }));


  //---------------------------------------------------------------

  // passport.serializeUser((user, cb) => {
  //   cb(null, user.id);
  // });



  // passport.deserializeUser((id, cb) => {
  //   User.findOne({
  //     _id: id
  //   }, (err, user) => {
  //     cb(err, user);
  //   })
  // })

  //----------------------------------------------------



};
