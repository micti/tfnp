import * as hash from '../../../src/util/hash.js'

test('MD5 hash', () => {
  expect(hash.md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
  expect(hash.md5('world')).toBe('7d793037a0760186574b0282f2f435e7')
  expect(hash.md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')
})

test('SHA1 hash', () => {
  expect(hash.sha1('hello')).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')
  expect(hash.sha1('world')).toBe('7c211433f02071597741e6ff5a8ea34789abbf43')
  expect(hash.sha1('')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709')
})

test('SHA256 hash', () => {
  expect(hash.sha256('hello')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
  expect(hash.sha256('world')).toBe('486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7')
  expect(hash.sha256('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
})

test('SHA512 hash', () => {
  expect(hash.sha512('hello')).toBe('9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043')
  expect(hash.sha512('world')).toBe('11853df40f4b2b919d3815f64792e58d08663767a494bcbb38c0b2389d9140bbb170281b4a847be7757bde12c9cd0054ce3652d0ad3a1a0c92babb69798246ee')
  expect(hash.sha512('')).toBe('cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e')
})
