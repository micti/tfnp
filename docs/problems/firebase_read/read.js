import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'
import writeCsv from '../../../src/io/csv_write.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.data')

const csvReader = readCsv(path, {
  engine: 'row'
})
// const csvWriter = writeCsv(clonePath)

/**
 * Line process
 *
 * @param {Buffer} val
 * @param {object} result
 * @param {number} row
 * @returns
 */
async function read2 (val, result, row) {
  // Fake row process
  const b = JSON.parse(val)

  if (!result) result = 0

  result++

  return result
}

// Main
async function main () {
  const start = Date.now()

  const data = await csvReader.index(read2)

  console.log('Rows:', data)
  console.log('Run in ms:', Date.now() - start)
  console.log(memoryUsage())
}

main().then(() => console.log('Done'))
