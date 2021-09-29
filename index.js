const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { StatusCodes } = require('http-status-codes');
// Import config
const swaggerOptions = require('./config/swagger');
const dbConfig = require('./config/db');
// Import routes
const authRoutes = require('./components/auth/authAPI');
const userRoutes = require('./components/users/userAPI');
const albumRoutes = require('./components/albums/albumAPI');
const photoRoutes = require('./components/photos/photoAPI');
// Import error handlers
const { errorHandler } = require('./helpers/errorHandler');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

dotenv.config();
// CONNECT DB
dbConfig();

// USE MIDDLEWARE
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(authRoutes);
app.use(userRoutes);
app.use(albumRoutes);
app.use(photoRoutes);

// ROUTE NOT FOUND
app.use('*', (req, res, next) => {
  const err = new Error('The route can not be found');
  err.statusCode = StatusCodes.NOT_FOUND;
  next(err);
});

// HANDLE ERROR MIDDLEWARE
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`App is listening on ${process.env.PORT}`)
);

module.exports = server;
