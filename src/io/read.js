import fsPr from 'fs/promises'
import fs from 'fs'

class Read {
  constructor (path) {
    this.path = path
  }

  async open () {
    this.reader = await fsPr.open(this.path, 'r')
  }

  open2 () {
    return new Promise((resolve, reject) => {
      fs.open(this.path, 'r', (err, fd) => {
        if (err) reject(err)

        this.fd = fd
        resolve()
      })
    })
  }

  read (buffer, from, length) {
    return this.reader.read(buffer, 0, length, from)
  }

  read2 (buffer, from, length) {
    return new Promise((resolve, reject) => {
      fs.read(this.fd, buffer, 0, length, from, (err, byteRead) => {
        if (err) reject(err)
        resolve(byteRead)
      })
    })
  }

  close () {
    return this.reader.close()
  }

  close2 () {
    return new Promise((resolve, reject) => {
      fs.close(this.fd, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  end () {
    return this.close()
  }
}

export default (file, options) => new Read(file, options)
