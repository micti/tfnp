// This btree implement is not suitable for common using.
// Only use for test in csv_check problem
// key size = 22 bytes
// value size = 4 bytes (32 bit interger)

class BtreeBuffer {
  constructor (bufferSize) {
    this.storage = Buffer.allocUnsafe(bufferSize)
    this.count = 0
    this.nodeSize = 34
    this.keySize = 22
    this.valueSize = 4
    this.valuePos = this.keySize
    this.leftSize = 4
    this.leftPos = this.valuePos + this.valueSize
    this.rightSize = 4
    this.rightPos = this.leftPos + this.leftSize
    this.rN = null
    this.maxTravel = 0
    this.nodeBuffer = Buffer.allocUnsafe(this.nodeSize)
    this.nodeCurrentKey = this.nodeBuffer.slice(0, this.keySize)

    // this.setAtMostLeft = 0
    // this.setAtMostRight = 0
    // this.mostLeft = false
    // this.mostLeftKey = Buffer.allocUnsafe(this.keySize)
    // this.mostLeftKeyPos = null
    // this.mostRight = false
    // this.mostRightKey = Buffer.allocUnsafe(this.keySize)
    // this.mostRightKeyPos = null
  }

  node (i) {
    return this.storage.slice(i * this.nodeSize, (i + 1) * this.nodeSize)
  }

  insert (k, v) {
    this.nodeBuffer.write(k)
    this.nodeBuffer.writeInt32BE(v, this.valuePos)
    this.nodeBuffer.writeInt32BE(0, this.leftPos)
    this.nodeBuffer.writeInt32BE(0, this.rightPos)

    if (this.rN === null) {
      this._insertNode()
      this.rN = this.storage.slice(0, this.nodeSize)
      return true
    }

    let cN = this.rN
    let cP = 0

    // // most left and most right to save
    // if (this.mostLeft !== false) {
    //   if (this.nodeCurrentKey.compare(this.mostLeftKey) === -1) {
    //     this._insertNode()
    //     this._updateNode(this.mostLeftKeyPos, true)

    //     // update leftmost
    //     this.setAtMostLeft++
    //     this.mostLeftKeyPos = this.count - 1
    //     this.mostLeftKey.set(this.nodeCurrentKey, 0)
    //     this.mostLeft = true

    //     return true
    //   }
    //   === return dup
    // }

    // if (this.mostRight !== false) {
    //   if (this.nodeCurrentKey.compare(this.mostRightKey) === 1) {
    //     this._insertNode()
    //     this._updateNode(this.mostRightKeyPos, false)

    //     // update leftmost
    //     this.setAtMostRight++
    //     this.mostRightKeyPos = this.count - 1
    //     this.mostRightKey.set(this.nodeCurrentKey, 0)
    //     this.mostRight = true

    //     return true
    //   }
    //   === return dup
    // }

    let i = 0
    // let allLeft = true
    // let allRight = true
    while (true) {
      i++
      if (this.nodeCurrentKey.compare(cN.slice(0, this.keySize)) === -1) {
        // allRight = false
        // allLeft = allLeft && true
        const l = cN.readInt32BE(this.leftPos)
        if (l === 0) {
          this._insertNode()
          this._updateNode(cP, true)

          // update most left
          // if (allLeft) {
          //   this.mostLeftKeyPos = this.count - 1
          //   this.mostLeftKey.set(this.nodeCurrentKey, 0)
          //   this.mostLeft = true
          // }

          break
        }

        cP = l
        cN = this.node(cP)
        continue
      }

      if (this.nodeCurrentKey.compare(cN.slice(0, this.keySize)) === 1) {
        // allLeft = false
        // allRight = allRight && true

        const r = cN.readInt32BE(this.rightPos)
        if (r === 0) {
          this._insertNode()
          this._updateNode(cP, false)

          // update most right
          // if (allRight) {
          //   this.mostRightKeyPos = this.count - 1
          //   this.mostRightKey.set(this.nodeCurrentKey, 0)
          //   this.mostRight = true
          // }

          break
        }

        cP = r
        cN = this.node(cP)
        continue
      }

      // duplicate
      if (this.maxTravel < i) this.maxTravel = i
      return cN.readInt32BE(this.valuePos)
    }

    if (this.maxTravel < i) this.maxTravel = i
    return true
  }

  _insertNode () {
    const pos = this.count * this.nodeSize
    this.storage.set(this.nodeBuffer, pos)
    this.count++
  }

  _updateNode (i, isL) {
    const pos = i * this.nodeSize + (isL ? this.leftPos : this.rightPos)
    this.storage.writeInt32BE(this.count - 1, pos)
  }
}

export default (size) => new BtreeBuffer(size)
