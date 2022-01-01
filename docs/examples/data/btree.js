import btree from '../../../src/data/btree.js'
import * as rd from '../../../src/gen/random.js'
import memoryUsage from '../../../src/util/memory.js'

const start = Date.now()
console.log(start)

const bt = btree()
for (let i = 0; i < 10_000_000; i++) {
  const n = bt.insert(rd.iid(), i)
  if (n !== true) {
    console.log(n)
  }
}

console.log(Date.now())
console.log(memoryUsage())

// bt.testTravelPreOrder()
