const dayInMonthLeap = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const dayInMonthNoLeap = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const fromIso = (t) => [
  +(t[0] + t[1] + t[2] + t[3]), // Y
  +(t[5] + t[6]), //               M
  +(t[8] + t[9]), //               D
  +(t[11] + t[12]), //             h
  +(t[14] + t[15]), //             m
  +(t[17] + t[18]), //             s
  +(t[20] + t[21] + t[22]) //      ms
]

const baseMonth = (time) => {
  const [, , D, h, m, s] = typeof time === 'string' ? fromIso(time) : time
  return s + m * 60 + h * 3600 + (D - 1) * 24 * 3600
}

const baseDay = (time) => {
  const [, , , h, m, s] = typeof time === 'string' ? fromIso(time) : time
  return s + m * 60 + h * 3600
}

const isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)

const incDay = (date, diff = 1) => {
  if (diff > 28) {
    diff = 1
  }

  let year = +(date[0] + date[1] + date[2] + date[3])
  let month = +(date[5] + date[6])
  let day = +(date[8] + date[9])

  day += diff

  const dayInMonth = isLeapYear(year) ? dayInMonthLeap : dayInMonthNoLeap

  if (day > dayInMonth[month]) {
    day = day - dayInMonth[month]
    month++

    if (month > 12) {
      month = 1
      year++
    }
  }

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}

const incSec = (date, diff = 1) => {
  if (diff > 2419200) {
    diff = 1
  }

  let y = +(date[0] + date[1] + date[2] + date[3])
  let mo = +(date[5] + date[6])
  let d = +(date[8] + date[9])
  let h = +(date[11] + date[12])
  let m = +(date[14] + date[15])
  let s = +(date[17] + date[18])

  const s1 = s + diff
  s = s1 % 60
  const m1 = m + ~~(s1 / 60)
  m = m1 % 60
  const h1 = h + ~~(m1 / 60)
  h = h1 % 24

  const ddiff = ~~(h1 / 24)
  const dayInMonth = isLeapYear(y) ? dayInMonthLeap : dayInMonthNoLeap

  d += ddiff
  if (d > dayInMonth[mo]) {
    d = d - dayInMonth[mo]
    mo++

    if (mo > 12) {
      mo = 1
      y++
    }
  }

  return `${y}-${mo < 10 ? '0' : ''}${mo}-${d < 10 ? '0' : ''}${d} ${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

const formatDate = (date) => {
  return date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6] + date[7] + date[8] + date[9] + date[10]
}

export {
  fromIso,
  baseMonth,
  baseDay,
  isLeapYear,
  incDay,
  incSec,
  formatDate
}
