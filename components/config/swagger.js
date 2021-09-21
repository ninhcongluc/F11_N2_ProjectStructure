const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Album Manage API',
      version: '2.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [
    `${process.cwd()}/components/users/userAPI.js`,
    `${process.cwd()}/components/auth/authAPI.js`,
  ],
};

module.exports = swaggerOptions;
