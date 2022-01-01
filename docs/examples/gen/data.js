import data from '../../../src/gen/data.js'

const a = data({
  a: {
    type: 'int',
    fill: 'incr',
    start: 1
  },
  b: {
    type: 'nanoid'
  }
}, {
  limit: 10
})

while (a.has()) {
  console.log(a.gen())
}
