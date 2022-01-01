import { join } from 'path'

import { csv } from '../../../src/gen/index.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.csv')
const generator = csv(path, {
  a: {
    type: 'int',
    fill: 'rand',
    range: [2, 50]
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
  }
}, [
  ['a', 'b', 'c', 'd']
], {
  limit: [
    1_000_000
  ]
})

;(async () => {
  await generator.generate()
})().catch(e => console.log(e))
