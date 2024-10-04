const actor = '/u/:actor'
const activity = '/s/:id'
const apRoutes = {
  actor,
  object: '/o/:id',
  activity,
  inbox: `${actor}/inbox`,
  outbox: `${actor}/outbox`,
  followers: `${actor}/followers`,
  following: `${actor}/following`,
  liked: `${actor}/liked`,
  collections: `${actor}/c/:id`,
  blocked: `${actor}/blocked`,
  rejections: `${actor}/rejections`,
  rejected: `${actor}/rejected`,
  shares: `${activity}/shares`,
  likes: `${activity}/likes`
}
export default apRoutes