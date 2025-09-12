export default function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const response = {
    message: err.message || 'Internal Server Error',
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
}


