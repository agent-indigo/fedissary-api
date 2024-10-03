import {isValidObjectId} from 'mongoose'
const validateObjectId = (
  request,
  response,
  next
) => {
  const id = request.params._id
  if (!isValidObjectId(id)) {
    response.status(400)
    throw new Error(`Error 400: Invalid Object ID:\n${id}`)
  }
  next()
}
export default validateObjectId