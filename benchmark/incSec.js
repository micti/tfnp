import benchmark from 'benchmark'

import { incSec as id1 } from '../src/util/dt/datetime.js'
import { incSec as id2 } from '../src/util/dt/epoch2021.js'

function test1 () {
  id1('2022-08-31 23:59:59')
}

function test2 () {
  id2('2022-08-31 23:59:59')
}

const suite = new benchmark.Suite()
suite
  .add('incTime in datetime', () => {
    test1()
  })
  .add('incSec in epoch2021', () => {
    test2()
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
