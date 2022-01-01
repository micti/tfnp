import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'
import writeCsv from '../../../src/io/csv_write.js'
import btree from '../../../src/data/btree_buffer.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.csv')
const errorPath = join(import.meta.url.replace('file:', ''), '../file/data_error.csv')

const csvReader = readCsv(path)
const csvWriter = writeCsv(errorPath)

// README BEFORE RUN
// Based on your random file, a number can be adjusted
const bt = btree(100_000_000 * 34)

const start = Date.now()
let checkpoint = start

async function validate (val, _, row) {
  let error = ''
  let hasValidError = false

  if (val.length !== 5) {
    error += ',col_number'
  }

  const col1 = val[0].toString()
  const col2 = val[1].toString()
  if (!/^[a-z0-9_]+$/.exec(col1)) {
    error += ',col_1'
    hasValidError = true
  }

  if (!/^[a-z0-9_]+$/.exec(col2)) {
    error += ',col_2'
    hasValidError = true
  }

  if (!hasValidError) {
    const notExist = bt.insert(col1 + col2, row)
    if (notExist !== true) {
      error += ',duplicate line ' + notExist
    }
  }

  if (error) {
    await csvWriter.writeLine(row + error)
  }

  // Because of long task, so let make to see it is running
  if (row % 1_000_000 === 0) {
    console.log('Process:', row, 'rows')
    console.log('Btree size:', bt.count)
    console.log('Btree size max travel:', bt.maxTravel)
    const now = Date.now()
    console.log('last 1 mils process time (s)', (now - checkpoint) / 1000)
    checkpoint = now
    console.log(memoryUsage())
  }
}

// Main
async function main () {
  await csvReader.index(validate)
  console.log(Date.now() - start)
  console.log(memoryUsage())
}

main().then(() => console.log('Done'))
