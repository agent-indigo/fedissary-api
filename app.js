import {createWriteStream} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import {MongoClient} from 'mongodb'
import apex from './config/apex.js'
import apRouter from './routers/apRouter.js'
const dbClient = new MongoClient(`mongodb+srv://${
  process.env.MONGODB_USER
}:${
  process.env.MONGODB_PASSWORD
}@${
  process.env.MONGODB_HOST
}?retryWrites=true&w=majority`)
const app = express()
app.use(
  express.json({
    type: apex.consts.jsonldTypes
  }),
  express.urlencoded({
    extended: true
  }),
  apex,
  cors(),
  helmet(),
  helmet.xssFilter(),
  hpp(),
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
  }),
  morgan(
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
  )
)
app.use(
  '/api/ap',
  apRouter
)
dbClient.connect().then(() => {
  apex.store.db = dbClient.db('fedissary')
  return apex.store.setup()
}).then(() => app.listen(
  8080,
  () => console.log(`Listening on ${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${
    process.env.DOMAIN
  }:8080 in ${
    process.env.NODE_ENV
  } mode`)
))