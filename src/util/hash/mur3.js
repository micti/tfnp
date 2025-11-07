// MurmurHash3 32-bit implementation
// Based on: https://en.wikipedia.org/wiki/MurmurHash

/**
 * MurmurHash3 32-bit hash function
 * @param {string} key - The string to hash
 * @param {number} seed - The seed value (default: 0)
 * @returns {number} 32-bit hash value
 */
export function murmur3_32 (key, seed = 0) {
  const c1 = 0xcc9e2d51
  const c2 = 0x1b873593
  const r1 = 15
  const r2 = 13
  const m = 5
  const n = 0xe6546b64

  let hash = seed

  const bytes = Buffer.from(key, 'utf8')
  const len = bytes.length
  const blocks = Math.floor(len / 4)

  // Process 4-byte chunks
  for (let i = 0; i < blocks; i++) {
    let k = bytes[i * 4] |
            (bytes[i * 4 + 1] << 8) |
            (bytes[i * 4 + 2] << 16) |
            (bytes[i * 4 + 3] << 24)

    k = Math.imul(k, c1)
    k = (k << r1) | (k >>> (32 - r1))
    k = Math.imul(k, c2)

    hash ^= k
    hash = (hash << r2) | (hash >>> (32 - r2))
    hash = Math.imul(hash, m) + n
  }

  // Process remaining bytes
  let k1 = 0
  const tail = len % 4

  if (tail >= 3) k1 ^= bytes[blocks * 4 + 2] << 16
  if (tail >= 2) k1 ^= bytes[blocks * 4 + 1] << 8
  if (tail >= 1) {
    k1 ^= bytes[blocks * 4]
    k1 = Math.imul(k1, c1)
    k1 = (k1 << r1) | (k1 >>> (32 - r1))
    k1 = Math.imul(k1, c2)
    hash ^= k1
  }

  // Finalization
  hash ^= len
  hash ^= hash >>> 16
  hash = Math.imul(hash, 0x85ebca6b)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 0xc2b2ae35)
  hash ^= hash >>> 16

  return hash >>> 0 // Convert to unsigned 32-bit integer
}

/**
 * MurmurHash3 32-bit hash function returning hex string
 * @param {string} key - The string to hash
 * @param {number} seed - The seed value (default: 0)
 * @returns {string} Hex string representation
 */
export function murmur3_32_hex (key, seed = 0) {
  return murmur3_32(key, seed).toString(16).padStart(8, '0')
}
