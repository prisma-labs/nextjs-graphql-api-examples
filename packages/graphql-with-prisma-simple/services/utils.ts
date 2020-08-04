export declare type PaginationArgs = {
  first?: number | null
  last?: number | null
  skip?: number | null
}

export function offsetToPrismaPagination(
  args: PaginationArgs,
): { take?: number; skip?: number } {
  const { first, last, skip } = args

  // If no pagination set, don't touch the args
  if (!first && !skip) {
    return {}
  }

  if (first && last) {
    throw new Error("first and last cannot be set simultaneously")
  }

  const take = resolveTake(first, last)

  const newArgs = {
    take,
    skip: skip ?? undefined,
  }

  return newArgs
}

function resolveTake(
  first: number | null | undefined,
  last: number | null | undefined,
): number | undefined {
  if (first && last) {
    throw new Error(`first and last can't be set simultaneously`)
  }

  if (first) {
    if (first < 0) {
      throw new Error(`first can't be negative`)
    }
    return first
  }

  if (last) {
    if (last < 0) {
      throw new Error(`last can't be negative`)
    }

    if (last === 0) {
      return 0
    }

    return last * -1
  }

  return undefined
}

function resolveCursor(
  before: string | null | undefined,
  after: string | null | undefined,
) {
  if (before && after) {
    throw new Error(`before and after can't be set simultaneously`)
  }

  if (before) {
    return { id: before }
  }

  if (after) {
    return { id: after }
  }

  return undefined
}

function resolveSkip(cursor: { id: string } | null | undefined) {
  if (cursor) {
    return 1
  }

  return undefined
}
