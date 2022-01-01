import benchmark from 'benchmark'

import { toEpoch } from '../src/util/dt/epoch2021.js'

function test1 () {
  const z = new Date('2022-08-31 00:00:00')
  return z.getTime()
}

function test2 () {
  return toEpoch('2022-08-31 00:00:00')
}

const suite = new benchmark.Suite()
suite
  .add('epoch by Date', () => {
    test1()
  })
  .add('epoch by epoch2021', () => {
    test2()
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
