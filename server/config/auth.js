const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('../../db/models/userModel.js');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  const validateUserPass = (username, password, done) => {
    User.findOne({ username }).exec()
      .then((user) => {
        if (user) {
          const salt = user.salt;
          const encryptedpw = user.password;
          if (bcrypt.hashSync(password, salt) === encryptedpw) {
            console.log('hello1');
            return done(null, user);
          }
          console.log('hello2');
          return done(null, false, { message: 'Incorrect username or password' });
        }
        console.log('hello3');
        return done(null, false, { message: 'Incorrect username or password' });
      });
  };

  module.exports.passport = passport.use(new LocalStrategy(validateUserPass));
};

module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
