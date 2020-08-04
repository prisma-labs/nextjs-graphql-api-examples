import { core, interfaceType, queryField, stringArg } from "@nexus/schema"
import { toGlobalId, fromGlobalId } from "graphql-relay"

// TypeName:ID -> base64

export const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", (root, _args, _ctx, info) =>
      toGlobalId(info.parentType.name, root.id),
    )
    t.resolveType((root) => {
      return (root as any).__typeName
    })
  },
})

function assertAllTypesCovered(_x: never, id: string): never {
  throw new Error("could not find any resource with id: " + id)
}

export const NodeField = queryField("node", {
  type: "Node",
  args: {
    id: stringArg({ required: true }),
  },
  async resolve(_root, args, ctx) {
    const { type } = fromGlobalId(args.id) as {
      type: core.GetGen2<"abstractResolveReturn", "Node">
      id: string
    }

    if (type === "BlogPost") {
      const post = await ctx.blogPost.findOne({ id: args.id })

      return { ...post, __typeName: type }
    }

    if (type === "User") {
      const user = await ctx.user.findOne({ id: args.id })

      return { ...user, __typeName: type }
    }

    assertAllTypesCovered(type, args.id)
  },
})
