import catchRequestErrors from './catchRequestErrors.js'
import userModel from '../models/userModel.js'
const authorize = (...roles) => catchRequestErrors(async (
  request,
  response,
  next
) => {
  const user = await userModel.findById(request.params._id)
  if (roles.some(role => user.roles.includes(role))) {
    next()
  } else {
    response.status(401)
    throw new Error('Unauthorized')
  }
})
export default authorize