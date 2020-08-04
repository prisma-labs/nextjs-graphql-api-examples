import { objectType, enumType } from "@nexus/schema";

export const QueryMeta = objectType({
  name: '_QueryMeta',
  definition(t) {
    t.int('count')
  }
})

export const OrderByEnum = enumType({
  name: 'OrderBy',
  members: ['asc', 'desc']
})