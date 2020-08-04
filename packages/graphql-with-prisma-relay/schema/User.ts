import { extendType, objectType, stringArg } from "@nexus/schema"

export const UserQuerySimple = extendType({
  type: "Viewer",
  definition(t) {
    t.field("User", {
      type: "User",
      args: {
        id: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.user.findOne(args)
      },
    })
    t.connectionField("allUsers", {
      type: "User",
      nodes(_root, args, ctx) {
        return ctx.user.findMany(args)
      },
    })
  },
})

export const User = objectType({
  name: "User",
  definition(t) {
    t.implements("Node")
    t.model.firstName()
    t.model.lastName()
    t.model.email()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
