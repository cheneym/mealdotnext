const User = require('../models/userModel.js');

module.exports = {
  getUser: (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec()
      .then((user) => {
        if (user) {
          res.json(user.id);
        } else {
          res.status(404).end('User not found');
        }
      });
  },

  addUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username, password }).exec()
      .then((user) => {
        if (user) {
          res.status(404).end('User already exists');
        } else {
          new User({ username, password })
            .save()
            .then((newUser) => {
              console.log(newUser);
              res.json(newUser);
              // req.logIn(newUser, (err) => {
              //   if (err) { return err; }
              //   return res.redirect('/');
              // });
            });
        }
      });
  },
};
