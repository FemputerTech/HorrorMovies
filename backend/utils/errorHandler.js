/**
 * Error helper functions
 */
function handleError(res, error, defaultMessage = "An error occurred") {
  console.error(error);
  const statusCode = error.response?.status || 500;
  res.status(statusCode).json({ error: error.message || defaultMessage });
}

module.exports = { handleError };
