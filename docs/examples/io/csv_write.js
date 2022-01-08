import { join } from 'path'

import writeCSV from '../../../src/io/csv_write.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/output/holder.csv')
const writer = writeCSV(path)

async function testWrite () {
  await writer.open()
  for (let i = 100000000000; i < 100000200100; i++) {
    await writer.writeLine(['abcdef-ghij-klm', i + 1, 'holder:holder1@vietname.vn', '2021-09-16 12:53:37'])
  }
  await writer.end()
  console.log(memoryUsage())
}

testWrite().then(() => console.log('Done'))
