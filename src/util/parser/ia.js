const ia = (contents, intructions) => {
  let input = contents
  const detect = {}

  for (const command of intructions) {
    if (command[0] === 'all') {
      const result = []
      let b = ia(input, command[2])

      while (Object.keys(b.detect).length !== 0) {
        result.push(b.detect)
        b = ia(b.input, command[2])
      }

      detect[command[1]] = result
      input = b.input
    }

    if (command[0] === 'in_range') {
      let start = null
      let count = 0
      let end = null

      for (let i = 0; i < input.length; i++) {
        if (input[i] === command[1]) {
          if (start === null) start = i
          count++
        }

        if (input[i] === command[2]) {
          count--
          if (count <= 0) {
            end = i
            break
          }
        }
      }

      if (start === null || end === null) {
        input = ''
        break
      }

      const range = input.substring(start + 1, end)
      input = input.substring(end + 1)

      const result = []
      let b = ia(range, command[4])

      while (Object.keys(b.detect).length !== 0) {
        result.push(b.detect)
        b = ia(b.input, command[4])
      }

      detect[command[3]] = result
    }

    if (command[0] === 'first') {
      const p = input.indexOf(command[1])

      if (p < 0) {
        input = ''
        break
      }

      input = input.substring(p + command[1].length)
    }

    if (command[0] === 'get') {
      const match = command[1].exec(input)

      if (!match) {
        input = ''
        break
      }

      detect[command[2]] = match[0]
      input = input.substring(match.index + match[0].length)
    }

    if (command[0] === 'skip') {
      let skip = 0
      for (let i = 0; i < input.length; i++) {
        skip = i
        if (input[i] !== command[1]) {
          break
        }
      }
      input = input.substring(skip)
    }

    if (command[0] === 'location') {
      let start = null
      let count = 0
      let end = null

      for (let i = 0; i < input.length; i++) {
        if (input[i] === command[1]) {
          if (start === null) start = i
          count++
        }

        if (input[i] === command[2]) {
          count--
          if (count <= 0) {
            end = i
            break
          }
        }
      }

      if (start === null || end === null) {
        input = ''
        break
      }

      detect[command[3]] = input.substring(start, end + 1)
      input = input.substring(end + 1)
    }
  }

  return {
    detect,
    input
  }
}

export default ia
