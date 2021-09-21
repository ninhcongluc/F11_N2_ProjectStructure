exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'Fail',
    message: err.message,
  });
  next();
};
