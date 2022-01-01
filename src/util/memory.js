export default (key) => {
  const mems = process.memoryUsage()

  Object.keys(mems).forEach(key => {
    mems[key] = mems[key] / (1024 * 1024)
  })

  return key ? mems[key] : mems
}
