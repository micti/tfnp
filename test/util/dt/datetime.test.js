import * as datetime from '../../../src/util/dt/datetime.js'

test('Base month from iso string', () => {
  expect(datetime.baseMonth('2021-09-01T00:00:00.000Z')).toBe(0)
  expect(datetime.baseMonth('2021-09-01T01:00:00.000Z')).toBe(3600)
})

test('Base month from iso object', () => {
  const t1 = datetime.fromIso('2021-09-01T00:00:00.000Z')
  const t2 = datetime.fromIso('2021-09-01T01:00:00.000Z')
  expect(datetime.baseMonth(t1)).toBe(0)
  expect(datetime.baseMonth(t2)).toBe(3600)
})

test('Base day from iso string', () => {
  expect(datetime.baseDay('2021-12-01T00:00:00.000Z')).toBe(0)
  expect(datetime.baseDay('2021-09-02T01:00:00.000Z')).toBe(3600)
})

test('Base month from iso object', () => {
  const t1 = datetime.fromIso('2021-12-01T00:00:00.000Z')
  const t2 = datetime.fromIso('2021-09-02T01:00:00.000Z')
  expect(datetime.baseDay(t1)).toBe(0)
  expect(datetime.baseDay(t2)).toBe(3600)
})

test('Leap year', () => {
  expect(datetime.isLeapYear(2023)).toBe(false)
  expect(datetime.isLeapYear(1900)).toBe(false)
  expect(datetime.isLeapYear(2024)).toBe(true)
})
