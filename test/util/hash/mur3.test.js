import { murmur3_32, murmur3_32_hex } from '../../../src/util/hash/mur3.js'

test('MurmurHash3 32-bit with default seed', () => {
  // Test with known values
  expect(murmur3_32('hello')).toBe(613153351)
  expect(murmur3_32('world')).toBe(4220927227)
  expect(murmur3_32('')).toBe(0)
  expect(murmur3_32('a')).toBe(1009084850)
})

test('MurmurHash3 32-bit with custom seed', () => {
  // Same input with different seeds should produce different hashes
  const hash1 = murmur3_32('hello', 0)
  const hash2 = murmur3_32('hello', 42)
  expect(hash1).not.toBe(hash2)

  expect(murmur3_32('hello', 42)).toBe(3806057185)
})

test('MurmurHash3 32-bit hex output', () => {
  expect(murmur3_32_hex('hello')).toBe('248bfa47')
  expect(murmur3_32_hex('world')).toBe('fb963cfb')
  expect(murmur3_32_hex('')).toBe('00000000')
})

test('MurmurHash3 consistent output', () => {
  // Same input should always produce same hash
  const input = 'test string'
  const hash1 = murmur3_32(input)
  const hash2 = murmur3_32(input)
  expect(hash1).toBe(hash2)
})

test('MurmurHash3 different lengths', () => {
  // Test strings of various lengths
  expect(murmur3_32('a')).toBe(1009084850)
  expect(murmur3_32('ab')).toBe(2613040991)
  expect(murmur3_32('abc')).toBe(3017643002)
  expect(murmur3_32('abcd')).toBe(1139631978)
  expect(murmur3_32('abcde')).toBe(3902511862)
})
