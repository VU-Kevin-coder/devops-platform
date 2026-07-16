function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({
    error: message,
    status
  })
}

module.exports = {
  errorHandler
}
