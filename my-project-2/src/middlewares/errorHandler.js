const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Resource not found at ${req.method} ${req.originalUrl}`,
    errors: []
  });
};

const errorHandler = (err, req, res, next) => {
  // Print the real error to the terminal
  console.error('SERVER ERROR DETAILS:', err);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: 'fail',
      message: `Duplicate value entered for '${field}'. Please use another value.`,
      errors: [{ field, message: `${field} must be unique` }]
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `Invalid format for field '${err.path}'`,
      errors: [{ field: err.path, message: `Invalid identifier: ${err.value}` }]
    });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: 'fail',
    message: statusCode === 500 ? (err.message || 'Internal server error occurred.') : err.message,
    errors: []
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};