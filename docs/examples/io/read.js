import { join } from 'path'

import readFile from '../../../src/io/read.js'
import memoryUsage from '../../../src/util/memory.js'

const path = join(import.meta.url.replace('file:', ''), '../../files/test.csv')
const reader = readFile(path)

async function testRead () {
  const buff = Buffer.allocUnsafe(1024)
  // await reader.open()
  await reader.open2()
  for (let i = 1; i < 100_000; i++) {
    await reader.read2(buff, 0, 30)
  }
  // await reader.end()
  await reader.close2()
  console.log(buff.toString('utf8'))
  console.log(memoryUsage())
}

console.log(Date.now())
testRead().then(() => console.log('Done:' + Date.now()))
