const convertToPlainDocument = leanDocument => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key] instanceof Date) {
      leanDocument[key] = leanDocument[key].toLocaleString()
    } else if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString()
    }
  }
  return leanDocument
}
export default convertToPlainDocument