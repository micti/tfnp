const parser = {
  state: {
    EMPTY: '',
    IN_LINE: 'in_line'
  },
  token: {
    n: '\n'.charCodeAt(0),
    r: '\r'.charCodeAt(0)
  }
}

class Line {
  constructor (found = null, options = {}) {
    this.options = {
      ...options
    }
    this.current = []
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
        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          // empty row, skip
          cur++
          continue
        }

        this.p.state = parser.state.IN_LINE
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
        cur++
        continue
      }

      if (this.p.state === parser.state.IN_LINE) {
        if (buffer[cur] === this.p.token.n || buffer[cur] === this.p.token.r) {
          // found new row
          await this._findRow()

          this.p.state = parser.state.EMPTY
          cur++
          continue
        }

        // Capture value
        this.p.currentBuffer.writeInt8(buffer[cur], this.p.currentCount)
        this.p.currentCount++
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

    if (this.p.state === parser.state.IN_LINE) {
      await this._findRow()
    }
  }

  async _findRow () {
    this.count++
    if (this.found) {
      await this.found(Buffer.from(this.p.currentBuffer.slice(0, this.p.currentCount)), this.count)
    }
    this.p.currentCount = 0
  }
}

export default (found, options = {}) => new Line(found, options)
