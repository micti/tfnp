const w = 5

const hw = (v) => {
  v -= ((v >>> 1) & 0x55555555)
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)

  return (((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24)
}

class SimpleBitSet {
  constructor () {
    this.data = []
  }

  add (index) {
    this.alloc(index)
    this.data[index >>> w] |= (1 << index)
  }

  get (index) {
    const n = index >>> w

    if (n >= this.data.length) {
      return 0 & 1
    }
    return this.data[n] >>> index
  }

  remove (index) {
    this.alloc(index)
    this.data[index >>> w] &= ~(1 << index)
  }

  empty () {
    this.data.length = 0
  }

  alloc (index) {
    const l = index >>> w
    for (let i = this.data.length; i <= l; i++) {
      this.data.push(0)
    }
  }

  for (f) {
    const s = this.data.length
    for (let i = 0; i < s; i++) {
      let v = this.data[i]
      while (v !== 0) {
        const t = v & -v
        f((i << w) + hw((t - 1) | 0))
        v ^= t
      }
    }
  }
}

export default (opt) => new SimpleBitSet(opt)
