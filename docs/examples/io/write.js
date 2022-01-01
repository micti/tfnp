import { join } from 'path'

import writeFile from '../../../src/io/write.js'
import memoryUsage from '../../../src/util/memory.js'
import { md5 } from '../../../src/util/hash.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/test.csv')
const writer = writeFile(path)

const data = md5('1')

async function testWrite () {
  console.log(Date.now())
  for (let i = 1; i <= 1_000; i++) {
    if (i % 200 === 0) console.log(i)
    await writer.write(i + ',' + data + '\n')
  }
  await writer.end()
  console.log(Date.now())
  console.log(memoryUsage())
}

testWrite().then(() => console.log('Done'))
