import * as epoch2021 from '../../../src/util/dt/epoch2021.js'

const base = Date.UTC(2021, 0, 1, 0, 0, 0)

test('toEpoch start year', () => {
  const d1 = Date.UTC(2021, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2021-01-01T00:00:00.000Z')).toBe(d1 - base)

  const d2 = Date.UTC(2022, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2022-01-01T00:00:00.000Z')).toBe((d2 - base) / 1000)

  const d3 = Date.UTC(2023, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2023-01-01T00:00:00.000Z')).toBe((d3 - base) / 1000)

  const d4 = Date.UTC(2024, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-01-01T00:00:00.000Z')).toBe((d4 - base) / 1000)

  const d5 = Date.UTC(2025, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-01-01T00:00:00.000Z')).toBe((d5 - base) / 1000)

  const d6 = Date.UTC(2026, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2026-01-01T00:00:00.000Z')).toBe((d6 - base) / 1000)

  const d7 = Date.UTC(2027, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2027-01-01T00:00:00.000Z')).toBe((d7 - base) / 1000)

  const d8 = Date.UTC(2028, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2028-01-01T00:00:00.000Z')).toBe((d8 - base) / 1000)

  const d9 = Date.UTC(2029, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2029-01-01T00:00:00.000Z')).toBe((d9 - base) / 1000)

  const d10 = Date.UTC(2030, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2030-01-01T00:00:00.000Z')).toBe((d10 - base) / 1000)
})

test('toEpoch start month leap year', () => {
  const d1 = Date.UTC(2024, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-01-01T00:00:00.000Z')).toBe((d1 - base) / 1000)

  const d2 = Date.UTC(2024, 1, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-02-01T00:00:00.000Z')).toBe((d2 - base) / 1000)

  const d3 = Date.UTC(2024, 2, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-03-01T00:00:00.000Z')).toBe((d3 - base) / 1000)

  const d4 = Date.UTC(2024, 3, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-04-01T00:00:00.000Z')).toBe((d4 - base) / 1000)

  const d5 = Date.UTC(2024, 4, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-05-01T00:00:00.000Z')).toBe((d5 - base) / 1000)

  const d6 = Date.UTC(2024, 5, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-06-01T00:00:00.000Z')).toBe((d6 - base) / 1000)

  const d7 = Date.UTC(2024, 6, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-07-01T00:00:00.000Z')).toBe((d7 - base) / 1000)

  const d8 = Date.UTC(2024, 7, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-08-01T00:00:00.000Z')).toBe((d8 - base) / 1000)

  const d9 = Date.UTC(2024, 8, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-09-01T00:00:00.000Z')).toBe((d9 - base) / 1000)

  const d10 = Date.UTC(2024, 9, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-10-01T00:00:00.000Z')).toBe((d10 - base) / 1000)

  const d11 = Date.UTC(2024, 10, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-11-01T00:00:00.000Z')).toBe((d11 - base) / 1000)

  const d12 = Date.UTC(2024, 11, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2024-12-01T00:00:00.000Z')).toBe((d12 - base) / 1000)
})

test('toEpoch start month non leap year', () => {
  const d1 = Date.UTC(2025, 0, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-01-01T00:00:00.000Z')).toBe((d1 - base) / 1000)

  const d2 = Date.UTC(2025, 1, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-02-01T00:00:00.000Z')).toBe((d2 - base) / 1000)

  const d3 = Date.UTC(2025, 2, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-03-01T00:00:00.000Z')).toBe((d3 - base) / 1000)

  const d4 = Date.UTC(2025, 3, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-04-01T00:00:00.000Z')).toBe((d4 - base) / 1000)

  const d5 = Date.UTC(2025, 4, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-05-01T00:00:00.000Z')).toBe((d5 - base) / 1000)

  const d6 = Date.UTC(2025, 5, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-06-01T00:00:00.000Z')).toBe((d6 - base) / 1000)

  const d7 = Date.UTC(2025, 6, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-07-01T00:00:00.000Z')).toBe((d7 - base) / 1000)

  const d8 = Date.UTC(2025, 7, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-08-01T00:00:00.000Z')).toBe((d8 - base) / 1000)

  const d9 = Date.UTC(2025, 8, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-09-01T00:00:00.000Z')).toBe((d9 - base) / 1000)

  const d10 = Date.UTC(2025, 9, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-10-01T00:00:00.000Z')).toBe((d10 - base) / 1000)

  const d11 = Date.UTC(2025, 10, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-11-01T00:00:00.000Z')).toBe((d11 - base) / 1000)

  const d12 = Date.UTC(2025, 11, 1, 0, 0, 0)
  expect(epoch2021.toEpoch('2025-12-01T00:00:00.000Z')).toBe((d12 - base) / 1000)
})

const testCases3 = [
  [
    [2026, 10, 5, 2, 1, 12],
    '2026-11-05 02:01:12'
  ],
  [
    [2029, 11, 31, 23, 59, 58],
    '2029-12-31 23:59:58'
  ],
  [
    [2028, 6, 14, 0, 1, 0],
    '2028-07-14 00:01:00'
  ]
]

test('toEpoch day, hour, min, sec', () => {
  testCases3.forEach(test => {
    const d = Date.UTC(test[0][0], test[0][1], test[0][2], test[0][3], test[0][4], test[0][5])
    expect(epoch2021.toEpoch(test[1])).toBe((d - base) / 1000)
  })
})

test('toDay day, hour, min, sec', () => {
  testCases3.forEach(test => {
    const d = Date.UTC(test[0][0], test[0][1], test[0][2], test[0][3], test[0][4], test[0][5])
    expect(epoch2021.toDate((d - base) / 1000)).toBe(test[1])
  })
})
