import readFile from './read.js'
import csvParser from '../util/parser/csv.js'
import csvRowParser from '../util/parser/csv_row.js'

class CsvRead {
  constructor (file, options) {
    this.file = file
    this.options = {
      engine: 'field',
      ...options
    }
  }

  all () {
    return this._all()
  }

  index (indexFnc) {
    return this._all(indexFnc)
  }

  // internal
  async _all (found = null) {
    const reader = readFile(this.file)
    await reader.open2()

    const data = []
    let index
    async function originFound (val, row) {
      if (found) {
        index = await found(val, index, row)
        return
      }

      data.push(val)
    }

    const parser = this.options.engine === 'field' ? csvParser(this.options.types, originFound) : csvRowParser(originFound)

    const bufferSize = 4 * 1024 * 1024
    const buffer = Buffer.allocUnsafe(bufferSize)
    let read = 1
    let pos = 0
    while (read) {
      read = await reader.read2(buffer, pos, bufferSize)
      if (read) {
        await parser.parser(read < bufferSize ? buffer.slice(0, read) : buffer)
      }
      pos += read
    }
    await parser.end()

    await reader.close2()
    return found ? index : data
  }
}

export default (file, options) => new CsvRead(file, options)
