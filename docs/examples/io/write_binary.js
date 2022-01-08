import { join } from 'path'

import writeFile from '../../../src/io/write.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/output/test.bin')
const writer = writeFile(path)

const buffer = Buffer.allocUnsafe(8)
buffer.writeBigInt64BE(BigInt(293948394829))

async function testWrite () {
  console.log(Date.now())
  writer.write(buffer)
  await writer.end()
  console.log(Date.now())
  console.log(memoryUsage())
}

testWrite().then(() => console.log('Done'))
