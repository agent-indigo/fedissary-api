import HttpError from '../utilities/HttpError.js'
const sequelizeErrorHandler = (
  error,
  request,
  response,
  next
) => {
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = error.errors.map(error => error.message)
    error.message = new HttpError(
      validationErrors,
      400
    )
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    error.message = new HttpError(
      'Duplicate field value entered.',
      400
    )
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    error.message = new HttpError(
      'Foreign key constraint violation.',
      400
    )
  } else if (error.name === 'SequelizeConnectionError') {
    error.message = new HttpError(
      'Database connection error.',
      500
    )
  } else if (error.name === 'SequelizeTimeoutError') {
    error.message = new HttpError(
      'Database operation timed out.',
      500
    )
  } else if (error.name === 'SequelizeAccessDeniedError') {
    error.message = new HttpError(
      'Access denied.',
      403
    )
  } else if (error.name === 'SequelizeError') {
    error.message = new HttpError(
      'Database operation failed.',
      500
    )
  }                
  response.status(response.statusCode || 500).json({
    error: error.message || '500 internal server error.',
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
}
export default sequelizeErrorHandler