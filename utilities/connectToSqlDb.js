import 'dotenv/config'
import sequelize from './sequelize.js'
const connectToSqlDb = async () => {
  let connected = false
  if (!connected) {
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      connected = true
      console.log('SQL database connection successful.')
      console.log('Schema successfully synchronized.')
      console.log(`DB name   : ${process.env.DB_NAME}`)
      console.log(`DB user   : ${process.env.DB_USER}`)
      console.log(`DB host   : ${process.env.DB_HOST}`)
      console.log(`DB port   : ${process.env.DB_PORT}`)
      console.log(`DB dialect: ${process.env.DB_DIALECT}`)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
export default connectToSqlDb