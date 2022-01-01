import bitset from '../../../src/data/simple_bitset.js'
import mem from '../../../src/util/memory.js'

const a = bitset()

a.add(1)
a.add(86400)
a.add(5)
a.add(3)
a.add(33)
a.add(7)
a.add(19)
a.add(2176782336)

const c = (l) => console.log(l)

a.for(c)

console.log(mem())
