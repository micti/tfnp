export default function permutate (list) {
  if (list.length === 1) {
    return [list]
  }

  const permutations = []

  const subListPermutations = permutate(list.slice(1))

  const firstEl = list[0]

  for (let i = 0; i < subListPermutations.length; i++) {
    const subPermutation = subListPermutations[i]

    for (let j = 0; j <= subPermutation.length; j++) {
      const permutationPrefix = subPermutation.slice(0, j)
      const permutationSuffix = subPermutation.slice(j)
      permutations.push(permutationPrefix.concat([firstEl], permutationSuffix))
    }
  }

  return permutations
}

// TODO:
// implement nth position
