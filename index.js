const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = require('./components/config/swagger');
const dbConfig = require('./components/config/db');
const statusCode = require('./components/errors/http-code');
// import routes
const userRoutes = require('./components/users/userAPI');
// import error handlers
const { errorHandler } = require('./components/errors/errorHandler');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

dotenv.config();
// db connection
dbConfig();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(userRoutes);

// unhandled Route
app.use('*', (req, res, next) => {
  const err = new Error('The route can not be found');
  err.statusCode = statusCode.NOT_FOUND;
  next(err);
});
// execute error
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`App is listening on ${process.env.PORT}`)
);

module.exports = server;
