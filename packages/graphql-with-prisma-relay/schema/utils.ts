import { core, inputObjectType } from "@nexus/schema"
import { OrderByEnum } from "./Meta"

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
