const recipeRouter = require('./routers/recipe.js');
const userRouter = require('./routers/user.js');
const clientRouter = require('./routers/client.js');
const isLoggedIn = require('./auth.js').isloggedIn;

module.exports = (app) => {
  app.use('/api/recipe', isLoggedIn, recipeRouter);
  app.use('/api/user', isLoggedIn, userRouter);
  app.use('/', clientRouter);
};
