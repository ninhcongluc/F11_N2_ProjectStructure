exports.errorHandler = (err, req, res, next) => {
  const statusCodes = err.statusCodes || 500;
  res.status(statusCodes).json({
    status: statusCodes,
    message: err.message,
  });
  next();
};
