import { createHash } from 'crypto'

export function md5 (string) {
  return createHash('md5').update(string).digest('hex')
}

export function sha1 (string) {
  return createHash('sha1').update(string).digest('hex')
}
