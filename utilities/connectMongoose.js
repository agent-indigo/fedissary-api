import {connect, set} from 'mongoose'
const connectToMongoDB = async () => {
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
      console.log('MongoDB successfully connected.')
    } catch (error) {
      console.error(`MongoDB connection error:\n${error}`)
      process.exit(1)
    }
  }
}
export default connectToMongoDB