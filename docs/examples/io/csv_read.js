import { join } from 'path'

import readCsv from '../../../src/io/csv_read.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/nhat.csv')
const csvReader = readCsv(path)

async function main () {
  const all = await csvReader.all()
  all.forEach(row => {
    row.forEach(col => console.log(col.toString()))
  })
}

main().then(() => console.log('Done'))
