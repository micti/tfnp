class Btree {
  constructor () {
    this.rN = null
  }

  insert (k, v) {
    const n = { k, v, l: null, r: null }

    if (this.rN === null) {
      this.rN = n
      return true
    }

    let cN = this.rN
    while (true) {
      if (cN.k > k) {
        if (!cN.l) {
          cN.l = n
          break
        }

        cN = cN.l
        continue
      }

      if (cN.k < k) {
        if (!cN.r) {
          cN.r = n
          break
        }

        cN = cN.r
        continue
      }

      return n
    }

    return true
  }

  testTravelPreOrder () {
    function t (n) {
      if (!n) return
      console.log(n.k, n.v)
      t(n.l)
      t(n.r)
    }

    t(this.rN)
  }
}

export default () => new Btree()
