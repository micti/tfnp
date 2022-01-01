import fs from 'fs'

/**
 * If implement by low-level API fs.write instead of writeStream
 * We need to handle temp write to buffer to archive high write speed
 * Default writeStream highWaterMark is 16384 (16Kb)
 */
class Write {
  constructor (path, options = {}) {
    this.path = path
    this.options = {
      // mode: 'stream',
      ...options
    }

    // if (this.options.mode === 'stream') {
    this.writer = fs.createWriteStream(this.path, options)
    // }
  }

  open () {
    return true
  }

  // async open2 () {
  //   return new Promise((resolve, reject) => {
  //     fs.open(this.path, 'w', (err, fd) => {
  //       if (err) reject(err)

  //       this.fd = fd
  //       resolve()
  //     })
  //   })
  // }

  async write (data) {
    const res = this.writer.write(data)
    if (!res) {
      return new Promise(resolve => this.writer.once('drain', resolve))
    }

    return true
  }

  // async write2 (buffer) {
  //   return new Promise((resolve, reject) => {
  //     fs.write(this.fd, buffer, (err, write) => {
  //       if (err) reject(err)

  //       resolve(write)
  //     })
  //   })
  // }

  async end () {
    return new Promise(resolve => this.writer.end(resolve))
  }

  // async end2 () {
  //   return new Promise((resolve, reject) => {
  //     fs.close(this.fd, (err) => {
  //       if (err) reject(err)
  //       resolve()
  //     })
  //   })
  // }
}

export default (file, options = {}) => new Write(file, options)
