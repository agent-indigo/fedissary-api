import {connect, set} from 'mongoose'
const connectToMongoDB = async () => {
  let connected = false
  set('strictQuery', true)
  if (!connected) {
    try {
      const connection = await connect(`mongodb+srv://${
        process.env.MONGODB_USER_NAME
      }:${
        process.env.MONGODB_USER_PASSWORD
      }@${
        process.env.MONGODB_HOST_NAME
      }/${
        process.env.MONGODB_DATABASE_NAME
      }?retryWrites=true&w=majority`)
      connected = true
      console.log(`MongoDB connection successful:\n${
        connection.connection.host
      }`)
    } catch (error) {
      console.error(`Error connecting to MongoDB:\n${error}`)
      process.exit(1)
    }
  }
}
export default connectToMongoDB