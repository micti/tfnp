// For test

import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'
import writeCsv from '../../../src/io/csv_write.js'
import btree from '../../../src/data/btree_buffer.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/test.csv')
const errorPath = join(import.meta.url.replace('file:', ''), '../file/test_error.csv')

const csvReader = readCsv(path)
const csvWriter = writeCsv(errorPath)

const bt = btree(100 * 34)

const start = Date.now()

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
}

// Main
async function main () {
  await csvReader.index(validate)
  console.log(Date.now() - start)
  console.log(memoryUsage())
}

main().then(() => console.log('Done'))
