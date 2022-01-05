import { join } from 'path'

import csvGen from '../../../src/gen/csv.js'

// const path = __dirname
const path = import.meta.url.replace('file:', '')
const output = join(path, '../../files/abc.csv')

const gen = csvGen(output, {
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
  limit: [
    200,
    5
  ],
  header: true
})

;(async () => {
  await gen.generate()
})().catch(e => console.log)
