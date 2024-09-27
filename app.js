import {createWriteStream} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import e404handler from './middleware/e404handler'
import sequelizeErrorHandler from './middleware/sequelizeErrorHandler'
import connectToSQLdb from './utilities/connectToSQLdb.js'
connectToSQLdb()
const app = express()
app.use(morgan(
  ':url,:method,:status,:response-time,:date[web]', {
    stream: createWriteStream(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'log.csv'
      ), {
        flags: 'a'
      }
    )
  }
))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(helmet.xssFilter())
app.use(hpp())
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
}))
app.use(e404handler)
app.use(sequelizeErrorHandler)
app.listen(
  8080,
  () => console.log(`Listening on port 8080 in ${process.env.NODE_ENV} mode`)
)