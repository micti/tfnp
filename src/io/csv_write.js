import writeFile from './write.js'

class CsvWrite {
  constructor (file) {
    this.file = file
    this.writer = writeFile(this.file)
  }

  open () {
    return this.writer.open()
  }

  writeLine (line) {
    return this.writer.write(line + '\n')
  }

  async writeLineBuffer (line) {
    await this.writer.write(line)
    return this.writer.write('\n')
  }

  writeData (data) {
    return this.writeLine(data.join(',')) // not safe, need a quote function here ^.^
  }

  end () {
    return this.writer.end()
  }
}

export default (file) => new CsvWrite(file)
