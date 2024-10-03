import 'dotenv/config'
import express from 'express'
import activitypubExpress from 'activitypub-express'
import {MongoClient} from 'mongodb'
const domain = process.env.DOMAIN ?? ''
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
    proxyUrl: `https://${domain}/proxy`
  }
})
const mongoDbClient = new MongoClient(process.env.MONGODB_CXN_STR ?? '')
const app = express()
app.use(
  express.json({
    type: apex.consts.jsonldTypes
  }),
  express.urlencoded({
    extended: true
  }),
  apex
)
app.route(routes.inbox).get(apex.net.inbox.get).post(apex.net.inbox.post)
app.route(routes.outbox).get(apex.net.outbox.get).post(apex.net.outbox.post)
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
mongoDbClient.connect().then(() => {
  apex.store.db = mongoDbClient.db('fedissary')
  return apex.store.setup()
}).then(() => app.listen(
  8080,
  () => console.log(`Listening on port 8080 in ${process.env.NODE_ENV} mode`)
))