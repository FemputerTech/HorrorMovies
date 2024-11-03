/**
 * Error helper functions
 */
function handleError(res, error, defaultMessage) {
  console.error(error); // Log the error for debugging
  const message = error.message || defaultMessage; // Fallback message
  res.status(400).json({ message }); // Send a 400 status for client errors
}

module.exports = { handleError };
