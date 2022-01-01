// All random functions for test purpose, so un-safe, based on Math.random()

import { toDate, epochYearRange } from '../util/dt/epoch2021.js'

const int = ({ min, max }) => Math.floor(Math.random() * (max - min + 1)) + min

const datetime = ({ min, max }) => toDate(int({ min, max }))

const datetimeInYear = (year) => datetime({ min: epochYearRange[year][0], max: epochYearRange[year][1] })

const abc09 = 'abcdefgh_jklmn-pqrstuvwxyz0123456789'
const ab = 'abcd3fgh_jklmn0pqr'

const iid = () => {
  let s = ''
  let len = 11
  while (len--) s += abc09[Math.random() * 36 | 0]

  return s
}

const id = () => {
  let s = ''
  let len = 6
  while (len--) s += ab[Math.random() * 18 | 0]

  return s
}

const customId = (len, abc) => {
  let s = ''
  const size = abc.length
  while (len--) s += abc[Math.random() * size | 0]

  return s
}

const shortIid = () => {
  let s = ''
  let len = 6
  while (len--) s += abc09[Math.random() * 36 | 0]

  return s
}

const year2022 = () => {
  return datetimeInYear(2022)
}

export {
  int,
  datetime,
  year2022,
  iid,
  shortIid,
  id,
  customId
}
