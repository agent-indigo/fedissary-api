import 'dotenv/config'
import activitypubExpress from 'activitypub-express'
import apRoutes from './apRoutes.js'
const apex = activitypubExpress({
  name: 'fedissary',
  version: '0.1.0',
  domain: process.env.DOMAIN,
  actorParam: 'actor',
  objectParam: 'id',
  activityParam: 'id',
  routes: apRoutes,
  endpoints: {
    proxyUrl: `${
      process.env.NODE_ENV === 'production' ? 'https' : 'http'
    }://${
      process.env.DOMAIN
    }/api/ap/proxy`
  }
})
export default apex