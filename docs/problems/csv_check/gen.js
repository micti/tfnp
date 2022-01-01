import { join } from 'path'

import { csv } from '../../../src/gen/index.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.csv')
const generator = csv(path, {
  a: {
    type: 'nanoid'
  },
  b: {
    type: 'nanoid'
  },
  c: {
    fill: 'value',
    value: 'Thuy Kieu la chi em la Thuy Van - Mai cot cach tuyet tinh than'
  },
  d: {
    type: 'nanoid'
  },
  e: {
    type: 'nanoid'
  }
}, [
  ['a', 'b', 'c', 'd', 'e']
], {
  limit: [
    120_000_000
  ]
})

;(async () => {
  console.log(Date.now())
  await generator.generate()
  console.log(Date.now())
  console.log(memoryUsage())
})().catch(e => console.log(e))
