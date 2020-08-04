import { intArg, inputObjectType, core } from "@nexus/schema"
import { OrderByEnum } from "./Meta"

export const paginationArgs = {
  first: intArg(),
  skip: intArg(),
}

export function buildOrderBy<M extends keyof core.GetGen<"rootTypes">>(
  model: M,
  fields: Array<keyof core.GetGen<"rootTypes">[M]>,
) {
  return inputObjectType({
    name: `${model}OrderBy`,
    definition(t) {
      for (const f of fields) {
        t.field(f as string, { type: OrderByEnum })
      }
    },
  })
}
