import { extendType, objectType, stringArg } from "@nexus/schema"
import { buildOrderBy, paginationArgs } from "./utils"

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.firstName()
    t.model.lastName()
    t.model.email()
  },
})

export const UserOrderBy = buildOrderBy("User", [
  "firstName",
  "lastName",
  "createdAt",
  "updatedAt",
])

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allUsers", {
      type: User,
      args: {
        ...paginationArgs,
        orderBy: UserOrderBy,
      },
      resolve(_root, args, ctx) {
        return ctx.user.findMany(args)
      },
    })

    t.field("_allUsersMeta", {
      type: "_QueryMeta",
      async resolve(_root, _args, ctx) {
        return {
          count: await ctx.user.count(),
        }
      },
    })

    t.field("User", {
      type: User,
      args: {
        id: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.user.findOne({ id: args.id })
      },
    })
  },
})
