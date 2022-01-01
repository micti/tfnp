import btree from '../../../src/data/btree_buffer.js'
// import * as rd from '../../../src/gen/random.js'
import memoryUsage from '../../../src/util/memory.js'

const start = Date.now()
console.log(start)
const data = [
  'a234567890123456789011',
  'b234567890123456789011',
  'c234567890123456789011',
  'e234567890123456789011',
  'd234567890123456789011',
  'a334567890123456789011',
  'a134567890123456789011',
  'a034567890123456789011',
  'e334567890123456789011',
  'c234567890123456789011', // dup line 3
  'd234567890123456789011' // dup line 5
]
const size = data.length
const bt = btree(34 * size)
let checkpoint = start
for (let i = 1; i <= size; i++) {
  // const b = bt.insert(rd.iid() + rd.iid(), i)
  const b = bt.insert(data[i - 1], i)
  if (b !== true) {
    console.log('dup:', i, b)
  }
  if (i % 1_000_000 === 0) {
    console.log('...rows:', i)
    console.log(memoryUsage())
    const now = Date.now()
    console.log(now - checkpoint)
    checkpoint = now
  }
}
console.log('Max:', bt.maxTravel)
const end = Date.now()
console.log('Avg:', (end - start) / size)
console.log(end)
console.log(bt.node(0))
console.log(bt.node(1))
console.log(bt.node(2))
console.log(bt.node(3))
console.log(bt.node(4))
console.log(bt.node(5))
console.log(bt.node(6))
console.log(bt.node(7))
console.log(bt.node(8))
// console.log(memoryUsage())
