import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.csv')

const csvReader = readCsv(path)

// time
const start = Date.now()
let checkpoint = start

// count index
async function count (val, _, row) {
  // Because long task, so let make to see it is running
  if (row % 1_000_000 === 0) {
    console.log('------------------------------------------')
    console.log('total processed rows:', row)
    const now = Date.now()
    console.log('Checkpoint:')
    console.log(' - Time parser 1 mil csv lines:', now - checkpoint, 'ns')
    console.log(' - Ram usage now (Mb):', memoryUsage().rss)
    console.log(' - Line', row, ' content')
    val.forEach(col => console.log('  * ', col.toString()))
    checkpoint = now
  }
}

// Main
async function main () {
  console.log('Start read each col of row (csv parser)')
  await csvReader.index(count)
  console.log('------------------------------------------')
  console.log('Total run time: ', Date.now() - start, 'ns')
}

main().then(() => console.log('Done'))
