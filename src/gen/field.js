import * as rd from './random.js'
import { toEpoch } from '../util/dt/epoch2021.js'
import { incDay, incSec, formatDate } from '../util/dt/datetime.js'

const fieldType = {
  int: 'Int',
  datetime: 'Datetime',
  date: 'Date',
  nanoid: 'Nanoid'
}

const nanoId = {
  iid: () => rd.iid(),
  shortIid: () => rd.shortIid(),
  id: () => rd.id(),
  custom: (l, a) => rd.customId(l, a)
}

const defaultSetting = {
  func: i => i,
  // Increment
  incr: 1,
  // Nano Id
  nanoid: 'iid',
  length: 11,
  dictionany: 'abcdefghijklmnopqrstuvwxyz0123456789_-ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

class Field {
  constructor (options) {
    this.setting = {
      ...defaultSetting,
      ...options
    }

    this.currentValue = null
  }

  gen (index) {
    this.currentValue = this._gen(index)
    // this.currentValue = value

    return this.currentValue
  }

  current () {
    return this.currentValue
  }

  _gen (index) {
    if (this.setting.fill === 'value') return this.setting.value

    if (this.setting.fill === 'func') return this.setting.func(index, this.currentValue)

    return this['_gen' + fieldType[this.setting.type]]()
  }

  _genInt () {
    if (this.setting.fill === 'rand') {
      return rd.int({ min: this.setting.range[0], max: this.setting.range[1] })
    }

    if (this.setting.fill === 'incr') {
      return this.currentValue === null ? this.setting.start : this.currentValue + this.setting.incr
    }
  }

  _genDatetime () {
    if (this.setting.fill === 'rand') {
      if (typeof this.setting.range === 'string') {
        return rd[this.setting.range]()
      }

      const min = toEpoch(this.setting.range[0])
      const max = toEpoch(this.setting.range[1])
      return rd.datetime({ min, max })
    }

    if (this.setting.fill === 'incr') {
      return this.currentValue === null ? this.setting.start : incSec(this.currentValue, this.setting.incr)
    }
  }

  _genDate () {
    if (this.setting.fill === 'rand') {
      if (typeof this.setting.range === 'string') {
        return formatDate(rd[this.setting.range]())
      }

      const min = toEpoch(this.setting.range[0] + ' 00:00:00')
      const max = toEpoch(this.setting.range[1] + ' 23:59:59')
      return formatDate(rd.datetime({ min, max }))
    }

    if (this.setting.fill === 'incr') {
      return this.currentValue === null ? this.setting.start : incDay(this.currentValue, this.setting.incr)
    }
  }

  _genNanoid () {
    if (this.setting.nanoid === 'custom') {
      return nanoId.custom(this.setting.length, this.setting.dictionany)
    }

    return nanoId[this.setting.nanoid]()
  }
}

export default (options) => new Field(options)
