import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'
import writeCsv from '../../../src/io/csv_write.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../file/data.csv')
const clonePath = join(import.meta.url.replace('file:', ''), '../file/data_clone.csv')

const csvReader = readCsv(path, {
  engine: 'row'
})
const csvWriter = writeCsv(clonePath)

// Read a row csv, and validation, store value and index in result
/**
 *
 * @param {Buffer} val
 * @param {object} result
 * @param {number} row
 * @returns
 */
async function clone (val, result, row) {
  const pos = val.indexOf(44)
  const col1 = +(val.slice(0, pos).toString())
  let i = 0
  while (i < col1) {
    await csvWriter.writeLineBuffer(val)
    i++
  }
  if (!result) result = 0

  result = result + col1

  return result
}

// Main
async function main () {
  const start = Date.now()

  const data = await csvReader.index(clone)

  console.log('New CSV:', data, 'rows')
  console.log('Run in ms:', Date.now() - start)
  console.log(memoryUsage())
}

main().then(() => console.log('Done'))
