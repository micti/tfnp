import group from '../../../src/gen/group.js'
import memoryUsage from '../../../src/util/memory.js'

const g = group({
  a: {
    type: 'int',
    fill: 'incr',
    start: 1
  },
  b: {
    type: 'nanoid'
  }
}, [
  ['a'],
  ['b']
], {
  limit: [10, 5]
})

while (g.has()) {
  console.log(g.gen())
}

console.log(g.getTotal())

console.log(memoryUsage())
