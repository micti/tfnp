import ia from './parser/ia.js'
import * as hash from './hash.js'
import { murmur3_32, murmur3_32_hex } from './hash/mur3.js'
import { fnv1a_32, fnv1a_32_hex, fnv1a_64, fnv1a_64_hex } from './hash/fnv1a.js'

export default {
  parser: {
    ia
  },
  hash: {
    ...hash,
    murmur3_32,
    murmur3_32_hex,
    fnv1a_32,
    fnv1a_32_hex,
    fnv1a_64,
    fnv1a_64_hex
  }
}
