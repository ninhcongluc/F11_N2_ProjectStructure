const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Album Manage API',
      version: '2.0.0',
    },
  },
  apis: [`${process.cwd()}/components/users/userAPI.js`],
};

module.exports = swaggerOptions;
