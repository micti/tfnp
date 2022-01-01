// todo
// bucket bitset            -> done
// hash mur3                -> not yet
// hash, twice hash....     -> not yet

import bs from './simple_bitset.js'

class BloomFilter {
  constructor (s, k) {
    this.bucket = bs()
    this.size = s
    this.hashCount = k
  }
}

export default (s, k) => new BloomFilter(s, k)
