const parser = {
  state: {
    EMPTY: '',
    IN_QUOTE_FIELD: 'in_qoute_field',
    IN_FIELD: 'in_field',
    QUOTE_IN_QUOTE_FIELD: 'check_espape',
    NEXT_FIELD: 'next_field'
  },
  token: {
    s: ','.charCodeAt(0),
    n: '\n'.charCodeAt(0),
    r: '\r'.charCodeAt(0),
    e: '"'.charCodeAt(0)
  }
}

class Csv {
  constructor (types = [], found = null, options = {}) {
    this.options = {
      ...options
    }
    this.current = []
    this.types = types
    this.p = {
      currentBuffer: Buffer.allocUnsafe(100 * 1024),
      currentCount: 0,
      token: {
        ...parser.token
      },
      state: parser.state.EMPTY
    }
    this.found = found
    this.count = 0
  }

  /**
   * TODO:
   * - if skip validation, skip check for UTF8 2,3,4 bytes
   *
   * @param {Buffer} buffer
   */
  async parser (buffer) {
    const pos = buffer.length
    let cur = 0
    while (cur < pos) {
      if (this.p.state === parser.state.EMPTY) {
        if (buffer[cur] === this.p.token.e) {
          this.p.state = parser.state.IN_QUOTE_FIELD

          cur++
          continue
        }

        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          // empty row, skip
          cur++
          continue
        }

        if (buffer[cur] === this.p.token.s) {
          // found new empty field
          this._findField()

          this.p.state = parser.state.NEXT_FIELD
          cur++
          continue
        }

        this.p.state = parser.state.IN_FIELD
        // Capture value
        // this.p.current.push(buffer[cur])
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
        cur++
        continue
      }

      if (this.p.state === parser.state.NEXT_FIELD) {
        if (buffer[cur] === this.p.token.e) {
          this.p.state = parser.state.IN_QUOTE_FIELD

          cur++
          continue
        }

        if (buffer[cur] === this.p.token.n) {
          // found empty new field
          this._findField()
          // found row
          await this._findRow()

          this.p.state = parser.state.EMPTY
          cur++
          continue
        }

        if (buffer[cur] === this.p.token.s) {
          // found empty new field
          this._findField()
          cur++
          continue
        }

        this.p.state = parser.state.IN_FIELD
        // Capture value
        // this.p.current.push(buffer[cur])
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
        cur++
        continue
      }

      if (this.p.state === parser.state.IN_FIELD) {
        if (buffer[cur] === this.p.token.s) {
          // found new field
          this._findField()
          this.p.state = parser.state.NEXT_FIELD
          cur++
          continue
        }

        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          // found new field
          this._findField()
          // found new row
          await this._findRow()

          this.p.state = parser.state.EMPTY
          cur++
          continue
        }

        // Capture value
        // this.p.current.push(buffer[cur])
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
        cur++
        continue
      }

      if (this.p.state === parser.state.IN_QUOTE_FIELD) {
        if (buffer[cur] === this.p.token.e) {
          this.p.state = parser.state.QUOTE_IN_QUOTE_FIELD
          cur++
          continue
        }

        // We do not support \n \r in field.
        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          throw new Error('We do not support new line character in quote field')
        }

        // Capture value
        // this.p.current.push(buffer[cur])
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
        cur++
        continue
      }

      if (this.p.state === parser.state.QUOTE_IN_QUOTE_FIELD) {
        if (buffer[cur] === this.p.token.e) {
          // capture value
          // this.p.current.push(buffer[cur])
          this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
          this.p.currentCount++
          this.p.state = parser.state.IN_QUOTE_FIELD
          cur++
          continue
        }

        // For other, only valid if current character is spe/newline
        if (
          buffer[cur] !== this.p.token.s &&
          buffer[cur] !== this.p.token.r &&
          buffer[cur] !== this.p.token.n
        ) {
          throw new Error('Not valid CSV')
        }

        // Capture field
        this._findField()

        if (buffer[cur] === this.p.token.s) {
          this.p.state = parser.state.NEXT_FIELD
          cur++
          continue
        }

        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          await this._findRow()
          this.p.state = parser.state.EMPTY
          cur++
          continue
        }

        // no Magic
        cur++
        continue
      }

      // no magic
      cur++
    }
  }

  async end () {
    if (this.p.state === parser.state.EMPTY) {
      return
    }

    if (
      this.p.state === parser.state.IN_FIELD ||
      this.p.state === parser.state.NEXT_FIELD ||
      this.p.state === parser.state.QUOTE_IN_QUOTE_FIELD
    ) {
      // capture field
      this._findField()
    }

    // all fails
    if (this.p.state === parser.state.IN_QUOTE_FIELD) {
      throw new Error('Quote field not finish')
    }

    // capture last row for in_field, next_field
    await this._findRow()
  }

  _findField () {
    if (this.p.currentCount === 0) {
      this.current.push(Buffer.from(''))
      return
    }

    this.current.push(Buffer.from(this.p.currentBuffer.slice(0, this.p.currentCount)))
    this.p.currentCount = 0
  }

  async _findRow () {
    this.count++
    if (this.found) {
      await this.found([...this.current], this.count)
    }
    this.p.currentPos = 0
    this.current.length = 0
  }
}

export default (type, found, options = {}) => new Csv(type, found, options)
