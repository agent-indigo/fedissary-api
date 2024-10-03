import catchRequestErrors from './catchRequestErrors.js'
import userModel from '../models/userModel.js'
const authorize = (...roles) => catchRequestErrors(async (
  request,
  response,
  next
) => {
  if (roles.includes((await userModel.findById(request._id)).role)) {
    next()
  } else {
    response.status(401)
    throw new Error('Unauthorized')
  }
})
export default authorize