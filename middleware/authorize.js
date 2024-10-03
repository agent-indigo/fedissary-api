import handleAsyncFn from './handleAsyncFn'
import userModel from '../models/userModel'
const authorize = (...roles) => handleAsyncFn(async (
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