import activitypubExpress from 'activitypub-express'
import apRoutes from './apRoutes.js'
const apex = activitypubExpress({
  name: 'fedissary',
  version: '0.1.0',
  domain: process.env.DOMAIN ?? '',
  actorParam: 'actor',
  objectParam: 'id',
  activityParam: 'id',
  routes: apRoutes,
  endpoints: {
    proxyUrl: `${
      `http${process.env.NODE_ENV === 'production' ? 's' : ''}`
    }://${
      process.env.DOMAIN ?? ''
    }/ap/proxy`
  }
})
export default apex