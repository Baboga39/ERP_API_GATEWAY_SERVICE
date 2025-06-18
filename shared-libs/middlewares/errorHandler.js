const CustomError = require('../errors/CustomError');

module.exports = function createErrorHandler(logger) {
  return function errorHandler(err, req, res, next) {
    const isCustom = err instanceof CustomError;
    const statusCode = isCustom ? err.statusCode : 500;
    const message = isCustom ? err.message : 'Internal Server Error';
    const errorDetails = isCustom ? err.details : err.stack;

   const logMessage = `[${req.method}] ${req.originalUrl} → ${err.statusCode || 500}: ${err.message}`;

  logger.error(logMessage, err);


    res.status(statusCode).json({
      success: false,
      statusCode,
      data: null,
      message,
      error: errorDetails || 'Unexpected error'
    });
  };
};
