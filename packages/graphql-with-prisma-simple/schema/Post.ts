import { extendType, objectType, stringArg } from "@nexus/schema"
import { paginationArgs, buildOrderBy } from "./utils"

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.url()
    t.model.votes()
  },
})

export const PostOrderBy = buildOrderBy("Post", [
  "title",
  "createdAt",
  "updatedAt",
  "votes",
])

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allPosts", {
      type: Post,
      args: {
        ...paginationArgs,
        orderBy: PostOrderBy,
      },
      resolve(_root, args, ctx) {
        return ctx.post.findMany(args)
      },
    })

    t.field("_allPostsMeta", {
      type: "_QueryMeta",
      async resolve(_root, _args, ctx) {
        return {
          count: await ctx.post.count(),
        }
      },
    })

    t.field("Post", {
      type: Post,
      args: {
        id: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.post.findOne({ id: args.id })
      },
    })
  },
})

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: Post,
      args: {
        title: stringArg({ required: true }),
        url: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.post.create({
          title: args.title,
          url: args.url,
        })
      },
    })

    t.field("votePost", {
      type: Post,
      args: {
        id: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        return ctx.post.votePost({ id: args.id })
      },
    })
  },
})
