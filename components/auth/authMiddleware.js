const ls = require('local-storage');
const jwt = require('jsonwebtoken');
const sc = require('../errors/http-code');

const authMiddleware = (req, res, next) => {
  const accessToken = ls.get('token');
  if (!accessToken) {
    const error = new Error('NOT FOUND TOKEN');
    res.statusCode = sc.UNAUTHORIZED;
    return next(error);
  }
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = user.username;
    return next();
  } catch (error) {
    return res.status(sc.BAD_REQUEST).send({ error: error.message });
  }
};

module.exports = authMiddleware;
