import genField from './field.js'

class Data {
  constructor (fields, options = {}) {
    this.fieldIdxs = Object.keys(fields)
    this.fields = {}
    this.fieldIdxs.forEach(index => {
      this.fields[index] = genField(fields[index])
    })

    this.options = {
      limit: 100,
      ...options
    }

    this.count = 0
    this.currentVal = null
  }

  has () {
    return this.count < this.options.limit
  }

  gen () {
    const data = {}
    this.count++

    this.fieldIdxs.forEach(field => {
      data[field] = this.fields[field].gen(this.count)
    })

    this.currentVal = data // { ...data }
    return data
  }

  reset () {
    this.count = 0
    this.currentVal = null
  }

  current () {
    return this.currentVal // { ...this.current }
  }
}

export default (fields, options = {}) => new Data(fields, options)
