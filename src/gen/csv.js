import csvWrite from '../io/csv_write.js'
import genGroup from './group.js'

class Csv {
  constructor (output, fields, groups, options = {}) {
    this.writer = csvWrite(output)
    this.options = {
      rowFormat: Object.keys(fields),
      ...options
    }

    this.group = genGroup(fields, groups, options)
  }

  async generate () {
    let nextValue = this.group.gen()
    while (nextValue) {
      await this.writer.writeLine(this._genRow(nextValue))
      nextValue = this.group.gen()
    }

    return this.writer.end()
  }

  _genRow (value) {
    let row = ''
    this.options.rowFormat.forEach(field => {
      row += (row ? ',' : '') + value[field]
    })
    return row
  }
}

export default (output, fields, groups, options = {}) => new Csv(output, fields, groups, options)
