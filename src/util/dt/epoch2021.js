/**
 * I made this lib in 2021, and support to 2030, ah =))))
 * 0 = 2021-01-01 00:00:00
 * No leap second in future. but we dont care
 */

import * as dt from './datetime.js'

const baseYear = 2021
const secondsInMin = 60
const secondsInHour = 60 * secondsInMin
const secondsInDay = 24 * secondsInHour
const secondsInYear = 365 * secondsInDay
const secondsInLeapYear = 366 * secondsInDay
const years = [
  0, //                                         2021 starts
  secondsInYear, //                             2022 starts,
  secondsInYear * 2, //                         2023 starts,
  secondsInYear * 3, //                         2024 starts, leap year
  secondsInYear * 3 + secondsInLeapYear, //     2025 starts
  secondsInYear * 4 + secondsInLeapYear, //     2026 starts
  secondsInYear * 5 + secondsInLeapYear, //     2027 starts
  secondsInYear * 6 + secondsInLeapYear, //     2028 starts, leap year
  secondsInYear * 6 + secondsInLeapYear * 2, // 2029 starts
  secondsInYear * 7 + secondsInLeapYear * 2 //  2030 starts
]
const months = [
  0,
  secondsInDay * 31,
  secondsInDay * (31 + 28),
  secondsInDay * (31 * 2 + 28),
  secondsInDay * (31 * 2 + 28 + 30),
  secondsInDay * (31 * 3 + 28 + 30),
  secondsInDay * (31 * 3 + 28 + 30 * 2),
  secondsInDay * (31 * 4 + 28 + 30 * 2),
  secondsInDay * (31 * 5 + 28 + 30 * 2),
  secondsInDay * (31 * 5 + 28 + 30 * 3),
  secondsInDay * (31 * 6 + 28 + 30 * 3),
  secondsInDay * (31 * 6 + 28 + 30 * 4)
]

const lMonths = [
  0,
  secondsInDay * 31,
  secondsInDay * (31 + 29),
  secondsInDay * (31 * 2 + 29),
  secondsInDay * (31 * 2 + 29 + 30),
  secondsInDay * (31 * 3 + 29 + 30),
  secondsInDay * (31 * 3 + 29 + 30 * 2),
  secondsInDay * (31 * 4 + 29 + 30 * 2),
  secondsInDay * (31 * 5 + 29 + 30 * 2),
  secondsInDay * (31 * 5 + 29 + 30 * 3),
  secondsInDay * (31 * 6 + 29 + 30 * 3),
  secondsInDay * (31 * 6 + 29 + 30 * 4)
]

const minEpoch = 0

const maxEpoch = years[10] + secondsInYear - 1

const toEpoch = (date) => {
  const d = dt.fromIso(date)
  const m = dt.isLeapYear(d[0]) ? lMonths : months

  let t = years[d[0] - baseYear] // year
  t += m[d[1] - 1] // month
  t += (d[2] - 1) * secondsInDay // day
  t += d[3] * secondsInHour // hour
  t += d[4] * secondsInMin // min
  t += d[5] // second

  return t
}

const toDate = (time) => {
  let yearIndex = 10
  for (let i = 0; i < years.length; i++) {
    if (years[i] > time) {
      yearIndex = i
      break
    }
  }
  const year = yearIndex - 1 + 2021
  let rT = time - years[yearIndex - 1]

  const m = dt.isLeapYear(year) ? lMonths : months
  let monthIndex = 12
  for (let i = 0; i < m.length; i++) {
    if (m[i] > rT) {
      monthIndex = i
      break
    }
  }
  const month = monthIndex - 1 + 1
  rT = rT - m[monthIndex - 1]

  const day = ~~(rT / secondsInDay) + 1
  rT = rT - (day - 1) * secondsInDay

  const hour = ~~(rT / secondsInHour)
  rT = rT - hour * secondsInHour

  const min = ~~(rT / secondsInMin)

  const sec = rT - min * secondsInMin

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}

const incDay = (date) => {
  return toDate(toEpoch(date) + secondsInDay)
}

const incHour = (date) => {
  return toDate(toEpoch(date) + secondsInHour)
}

const incMin = (date) => {
  return toDate(toEpoch(date) + secondsInMin)
}

const incSec = (date) => {
  return toDate(toEpoch(date) + 1)
}

const epochYearRange = {
  2021: [years[0], years[1] - 1],
  2022: [years[1], years[2] - 1],
  2023: [years[2], years[3] - 1],
  2024: [years[3], years[4] - 1],
  2025: [years[4], years[5] - 1],
  2026: [years[5], years[6] - 1],
  2027: [years[6], years[7] - 1],
  2028: [years[7], years[8] - 1],
  2029: [years[8], years[9] - 1],
  2030: [years[9], years[10] - 1]
}

export {
  minEpoch,
  maxEpoch,
  epochYearRange,
  toEpoch,
  toDate,
  incDay,
  incHour,
  incMin,
  incSec
}
