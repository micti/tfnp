import { fnv1a_32, fnv1a_32_hex, fnv1a_64, fnv1a_64_hex } from '../../../src/util/hash/fnv1a.js'

test('FNV-1a 32-bit hash', () => {
  // Test with known FNV-1a values
  expect(fnv1a_32('')).toBe(2166136261)
  expect(fnv1a_32('a')).toBe(3826002220)
  expect(fnv1a_32('hello')).toBe(1335831723)
  expect(fnv1a_32('world')).toBe(2746780785)
})

test('FNV-1a 32-bit hex output', () => {
  expect(fnv1a_32_hex('hello')).toBe('4f9f2cab')
  expect(fnv1a_32_hex('')).toBe('811c9dc5')
})

test('FNV-1a 32-bit consistent output', () => {
  // Same input should always produce same hash
  const input = 'test string'
  const hash1 = fnv1a_32(input)
  const hash2 = fnv1a_32(input)
  expect(hash1).toBe(hash2)
})

test('FNV-1a 32-bit different inputs', () => {
  // Different inputs should produce different hashes
  const hash1 = fnv1a_32('foo')
  const hash2 = fnv1a_32('bar')
  expect(hash1).not.toBe(hash2)
})

test('FNV-1a 64-bit hash', () => {
  // Test with known FNV-1a 64-bit values
  expect(fnv1a_64('')).toBe(14695981039346656037n)
  expect(fnv1a_64('a')).toBe(12638153115695167455n)
  expect(fnv1a_64('hello')).toBe(11831194018420276491n)
})

test('FNV-1a 64-bit hex output', () => {
  expect(fnv1a_64_hex('hello')).toBe('a430d84680aabd0b')
  expect(fnv1a_64_hex('')).toBe('cbf29ce484222325')
})

test('FNV-1a 64-bit consistent output', () => {
  // Same input should always produce same hash
  const input = 'test string'
  const hash1 = fnv1a_64(input)
  const hash2 = fnv1a_64(input)
  expect(hash1).toBe(hash2)
})

test('FNV-1a handles longer strings', () => {
  const longString = 'The quick brown fox jumps over the lazy dog'
  expect(fnv1a_32(longString)).toBe(1344795651)
  expect(fnv1a_64(longString)).toBe(12725685118143480205n)
})
