import genData from './data.js'

class Group {
  constructor (fields, groups, options = {}) {
    this.groups = []
    this.options = {
      limit: [],
      ...options
    }

    // make data
    groups.forEach((group, i) => {
      const fieldList = {}
      const limit = this.options.limit[i] ?? 100

      group.forEach(field => {
        fieldList[field] = fields[field]
      })
      this.groups.push(genData(fieldList, { limit: limit }))
    })
    this.totalGroup = this.groups.length

    //
    this.count = 0
  }

  has () {
    for (let i = 0; i < this.totalGroup; i++) {
      if (this.groups[i].has()) {
        return true
      }
    }

    return false
  }

  gen () {
    if (this.count === 0) return this.genFirst()

    let hasNew = false
    let data = {}
    for (let i = this.totalGroup - 1; i >= 0; i--) {
      if (!hasNew) {
        hasNew = true

        if (!this.groups[i].has()) {
          if (i === 0) {
            return false
          }
          this.groups[i].reset()
          hasNew = false
        }

        data = {
          ...data,
          ...this.groups[i].gen()
        }

        continue
      }

      data = {
        ...data,
        ...this.groups[i].current()
      }
    }

    this.count++
    return data
  }

  genFirst () {
    let data = {}
    for (let i = 0; i < this.totalGroup; i++) {
      data = {
        ...data,
        ...this.groups[i].gen()
      }
    }

    this.count++
    return data
  }

  getTotal () {
    return this.count
  }
}

export default (fields, groups, options = {}) => new Group(fields, groups, options)
