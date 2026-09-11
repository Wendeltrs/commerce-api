type NestedObject = Record<string, unknown>

function nested(object: NestedObject, keys: string[], value: unknown) {
  const lastKey = keys.pop() as string

  const target = keys.reduce((acc, key) => {
    if (typeof acc[key] !== 'object' || acc[key] === null) {
      acc[key] = {}
    }

    return acc[key] as NestedObject
  }, object)

  target[lastKey] = value
}

export function getPrismaWhere(query: string) {
  const where: NestedObject = {}

  if (!query) {
    return where
  }

  query.split(';').forEach((item) => {
    const [key, initial, ...rest] = item.split(':')
    const hasRest = rest.length > 0
    let value: unknown = hasRest ? initial.concat(`:${rest.join(':')}`) : initial

    if (value === 'true') value = true
    if (value === 'false') value = false
    if (value === 'null') value = null
    if (typeof value === 'string') value = value.trim()

    if (key.endsWith('*')) {
      const newKey = key.slice(0, -1)
      nested(where, newKey.split('.'), { contains: value, mode: 'insensitive' })
      return
    }
    if (key.endsWith('!')) {
      const newKey = key.slice(0, -1)
      nested(where, newKey.split('.'), { not: value })
      return
    }
    if (key.endsWith('>')) {
      const newKey = key.slice(0, -1)
      nested(where, newKey.split('.'), { gte: value })
      return
    }
    if (key.endsWith('<')) {
      const newKey = key.slice(0, -1)
      nested(where, newKey.split('.'), { lte: value })
      return
    }

    nested(where, key.split('.'), value)
  })

  return where
}
