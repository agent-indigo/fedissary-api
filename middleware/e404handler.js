import HttpError from '../utilities/HttpError.js'
const e404handler = (
  request,
  response,
  next
) => {
  response.status(404)
  next(new HttpError(
    `${request.originalUrl} not found.`,
    404
  ))
}
export default e404handler