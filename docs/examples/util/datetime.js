import * as datetime from '../../../src/util/datetime.js'
import memoryUsage from '../../../src/util/memory.js'

console.log(Date.now())

console.log(datetime.fromIso('2021-09-11T12:12:12.000Z'))

console.log(datetime.baseMonth('2021-09-01T00:00:12.000Z'))
console.log(datetime.baseMonth('2021-09-01T00:12:12.000Z'))

console.log(datetime.incSec('2021-12-14 12:54:23', 60))
console.log(datetime.incSec('2021-12-14 12:54:23', 5 * 60 + 37))
console.log(datetime.incSec('2021-12-14 12:54:23', 11 * 3600 + 5 * 60 + 37))

console.log(memoryUsage())
