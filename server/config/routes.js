const recipeRouter = require('./routers/recipe.js');
const userRouter = require('./routers/user.js');
const clientRouter = require('./routers/client.js');
const passport = require('./auth.js').passport;

module.exports = (app) => {
  app.use('/api/recipe', passport.authenticate('local'), recipeRouter);
  app.use('/api/user', passport.authenticate('local'), userRouter);
  app.use('/', clientRouter);
};
