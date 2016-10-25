const mongoose = require('mongoose');
const IngredientSchema = require('./ingredientSchema.js');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salt: { type: String },
  meals: { type: [Schema.Types.ObjectId], ref: 'meal' },
  shoppingList: [IngredientSchema],
});

UserSchema.pre('save', function (next) { // eslint-disable-line
  return bcrypt
  .genSaltAsync(10).bind(this)
  .then((salt) => {
    this.salt = salt;
    return bcrypt.hashAsync(this.password, salt, null).bind(this);
  }).then((password) => {
    console.log(password);
    this.password = password;
    next();
  });
});

module.exports = UserSchema;
