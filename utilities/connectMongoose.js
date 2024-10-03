import {connect, set} from 'mongoose'
const connectMongoose = async () => {
  let connected = false
  set('strictQuery', true)
  if (!connected) {
    try {
      await connect(`mongodb+srv://${
        process.env.MONGODB_USER
      }:${
        process.env.MONGODB_PASSWORD
      }@${
        process.env.MONGODB_HOST
      }/fedissary?retryWrites=true&w=majority`)
      connected = true
      console.log('Mongoose successfully connected.')
    } catch (error) {
      console.error(`Mongoose connection error:\n${error}`)
      process.exit(1)
    }
  }
}
export default connectMongoose