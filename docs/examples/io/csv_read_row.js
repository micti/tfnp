import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/abcd.csv')

function validate (val, result) {
  console.log(val.toString())
  if (!result) result = 0
  result++
  return result
}

const csvReader = readCsv(path, {
  engine: 'row'
})

async function main () {
  const all = await csvReader.index(validate)
  console.log(all)
}

main().then(() => console.log('Done'))
