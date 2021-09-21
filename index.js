const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// Import config
const swaggerOptions = require('./components/config/swagger');
const dbConfig = require('./components/config/db');
const statusCode = require('./components/errors/http-code');
// Import routes
const authRoutes = require('./components/auth/authAPI');
const userRoutes = require('./components/users/userAPI');
// Import error handlers
const { errorHandler } = require('./components/errors/errorHandler');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

dotenv.config();
// CONNECT DB
dbConfig();

//USE MIDDLEWARE
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(authRoutes);
app.use(userRoutes);

// ROUTE NOT FOUND
app.use('*', (req, res, next) => {
  const err = new Error('The route can not be found');
  err.statusCode = statusCode.NOT_FOUND;
  next(err);
});

// HANDLE ERROR MIDDLEWARE
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`App is listening on ${process.env.PORT}`)
);

module.exports = server;
