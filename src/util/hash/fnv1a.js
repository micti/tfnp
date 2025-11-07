// FNV-1a (Fowler-Noll-Vo) hash function
// Fast non-cryptographic hash function

/**
 * FNV-1a 32-bit hash function
 * @param {string} str - The string to hash
 * @returns {number} 32-bit hash value
 */
export function fnv1a_32 (str) {
  const FNV_PRIME_32 = 0x01000193
  const FNV_OFFSET_32 = 0x811c9dc5

  let hash = FNV_OFFSET_32

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, FNV_PRIME_32)
  }

  return hash >>> 0 // Convert to unsigned 32-bit integer
}

/**
 * FNV-1a 32-bit hash function returning hex string
 * @param {string} str - The string to hash
 * @returns {string} Hex string representation
 */
export function fnv1a_32_hex (str) {
  return fnv1a_32(str).toString(16).padStart(8, '0')
}

/**
 * FNV-1a 64-bit hash function
 * Note: JavaScript doesn't natively support 64-bit integers,
 * so this returns a BigInt
 * @param {string} str - The string to hash
 * @returns {BigInt} 64-bit hash value
 */
export function fnv1a_64 (str) {
  const FNV_PRIME_64 = 0x100000001b3n
  const FNV_OFFSET_64 = 0xcbf29ce484222325n

  let hash = FNV_OFFSET_64

  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i))
    hash = (hash * FNV_PRIME_64) & 0xffffffffffffffffn
  }

  return hash
}

/**
 * FNV-1a 64-bit hash function returning hex string
 * @param {string} str - The string to hash
 * @returns {string} Hex string representation
 */
export function fnv1a_64_hex (str) {
  return fnv1a_64(str).toString(16).padStart(16, '0')
}
