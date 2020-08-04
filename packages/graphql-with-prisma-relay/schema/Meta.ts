import { enumType } from "@nexus/schema"

export const OrderByEnum = enumType({
  name: "OrderBy",
  members: ["asc", "desc"],
})
