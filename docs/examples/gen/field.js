import genField from '../../../src/gen/field.js'

const a = genField({
  type: 'int',
  fill: 'incr',
  range: [4, 20000000],
  incr: 2,
  start: 1
})

for (let i = 0; i < 1; i++) {
  console.log(a.gen(i))
}

const b = genField({
  type: 'datetime',
  fill: 'incr',
  range: ['2021-12-01 00:00:00', '2021-12-31 23:59:59'],
  incr: 15,
  start: '2021-12-01 00:00:00'
})

for (let i = 0; i < 1; i++) {
  console.log(b.gen(i))
}

const c = genField({
  type: 'date',
  fill: 'incr',
  // range: ['2021-12-01', '2021-12-31'],
  range: 'year2022',
  incr: 2,
  start: '2021-12-01'
})

for (let i = 0; i < 1; i++) {
  console.log(c.gen(i))
}

const d = genField({
  type: 'nanoid',
  nanoid: 'shortIid',
  // length: 2
})

for (let i = 0; i < 10; i++) {
  console.log(d.gen(i))
}
