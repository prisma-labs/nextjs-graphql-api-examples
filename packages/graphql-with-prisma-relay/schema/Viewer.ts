import { extendType } from "@nexus/schema"

export const ViewerQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("viewer", {
      type: "Viewer",
      resolve() {
        return {}
      }
    })
  },
})
