import permutate from '../../../src/data/permutation.js'
import memoryUsage from '../../../src/util/memory.js'

// Fixed winners
// MCI, LIV, AJA, RMR, BAY, MUD, LIL, JUV
//   0,   1,   2,   3,   4,   5,   6,   7
// Runner-up
// PSG, ATM, SPO, INT, BEN, VIL, SAL, CHE
//   0,   1,   2,   3,   4,   5,   6,   7

const sameCountry = [
  [6], // PSG same with LIL
  [3], // ATM same with RMR
  [], // SPO not same
  [7], // INT same JUV
  [], // BEN not same
  [3], // VIL same RMR
  [], // SAL not same
  [0, 1, 5] // CHE same with MCI, LIV, MUD
]

const isAccept = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (i === list[i]) { // same table
      return false
    }

    if (sameCountry[list[i]].includes(i)) { // same country
      return false
    }
  }

  return true
}

const isChelVsLil = (list) => list[6] === 7 // 7 is chelsea, 6 is pos of Lil
const isChelVsAjax = (list) => list[2] === 7
const isChelVsReal = (list) => list[3] === 7
const isChelVsBayern = (list) => list[4] === 7

console.log(Date.now())
const a = permutate([0, 1, 2, 3, 4, 5, 6, 7])
const b = a.filter(i => isAccept(i))
const c1 = b.filter(i => isChelVsAjax(i))
const c2 = b.filter(i => isChelVsReal(i))
const c3 = b.filter(i => isChelVsBayern(i))
const c4 = b.filter(i => isChelVsLil(i))
console.log(a.length)
console.log(b.length)
console.log(c1.length)
console.log(c2.length)
console.log(c3.length)
console.log(c4.length)
console.log(Date.now())
console.log(memoryUsage())
