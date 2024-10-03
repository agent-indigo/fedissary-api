import {createWriteStream} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import 'dotenv/config'
import express from 'express'
import activitypubExpress from 'activitypub-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import session from 'express-session'
import {MongoClient} from 'mongodb'
import connectMongoose from './utilities/connectMongoose.js'
import send404responses from './middleware/send404responses.js'
import sendErrorResponses from './middleware/sendErrorResponses.js'
const domain = process.env.DOMAIN ?? ''
const mode = process.env.NODE_ENV ?? 'development'
const protocol = mode === 'production' ? 'https' : 'http'
const dbClient = new MongoClient(`mongodb+srv://${
  process.env.MONGODB_USER
}:${
  process.env.MONGODB_PASSWORD
}@${
  process.env.MONGODB_HOST
}?retryWrites=true&w=majority`)
const routes = {
  actor: '/u/:actor',
  object: '/o/:id',
  activity: '/s/:id',
  inbox: '/u/:actor/inbox',
  outbox: '/u/:actor/outbox',
  followers: '/u/:actor/followers',
  following: '/u/:actor/following',
  liked: '/u/:actor/liked',
  collections: '/u/:actor/c/:id',
  blocked: '/u/:actor/blocked',
  rejections: '/u/:actor/rejections',
  rejected: '/u/:actor/rejected',
  shares: '/s/:id/shares',
  likes: '/s/:id/likes'
}
const apex = activitypubExpress({
  name: 'fedissary',
  version: '0.1.0',
  domain,
  actorParam: 'actor',
  objectParam: 'id',
  activityParam: 'id',
  routes,
  endpoints: {
    proxyUrl: `${protocol}://${domain}/proxy`
  }
})
const app = express()
app.use(
  express.json({
    type: apex.consts.jsonldTypes
  }),
  express.urlencoded({
    extended: true
  }),
  apex,
  cookieParser(),
  session({
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: false
  }),
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
app
.route(routes.inbox)
.get(apex.net.inbox.get)
.post(apex.net.inbox.post)
app
.route(routes.outbox)
.get(apex.net.outbox.get)
.post(apex.net.outbox.post)
app.get(
  routes.actor,
  apex.net.actor.get
)
app.get(
  routes.followers,
  apex.net.followers.get
)
app.get(
  routes.following,
  apex.net.following.get
)
app.get(
  routes.liked,
  apex.net.liked.get
)
app.get(
  routes.object,
  apex.net.object.get
)
app.get(
  routes.activity,
  apex.net.activityStream.get
)
app.get(
  routes.shares,
  apex.net.shares.get
)
app.get(
  routes.likes,
  apex.net.likes.get
)
app.get(
  '/.well-known/webfinger',
  apex.net.webfinger.get
)
app.get(
  '/.well-known/node-info',
  apex.net.nodeInfoLocation.get
)
app.get(
  '/nodeinfo/:version',
  apex.net.nodeInfo.get
)
app.post(
  '/proxy',
  apex.net.proxy.post
)
app.on(
  'apex-outbox',
  msg => {
    if (msg.mkactivity.type === 'Create') {
      console.log(`New ${msg.object.type} from ${msg.actor}`)
    }
  }
)
app.on(
  'apex-inbox',
  msg => {
    if (msg.mkactivity.type === 'Create') {
      console.log(`New ${msg.object.type} from ${msg.actor}`)
    }
  }
)
app.use(send404responses)
app.use(sendErrorResponses)
dbClient.connect().then(() => {
  apex.store.db = dbClient.db('fedissary')
  return apex.store.setup()
}).then(() => {
  connectMongoose()
  app.listen(
    8080,
    () => console.log(`Listening on ${protocol}://${domain}:8080 in ${mode} mode`)
  )
})