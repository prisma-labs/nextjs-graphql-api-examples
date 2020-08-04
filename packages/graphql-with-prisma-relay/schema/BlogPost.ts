import { extendType, objectType, stringArg } from "@nexus/schema"
import { buildOrderBy } from "./utils"
import { fromGlobalId } from "graphql-relay"

export const BlogPost = objectType({
  name: "BlogPost",
  definition(t) {
    t.implements("Node")
    t.model.title()
    t.model.content()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const AllBlogPostsOrderBy = buildOrderBy("BlogPost", [
  "createdAt",
  "updatedAt",
])

export const PostQuery = extendType({
  type: "Viewer",
  definition(t) {
    t.field("BlogPost", {
      type: "BlogPost",
      args: { id: stringArg({ required: true }) },
      resolve(_root, args, ctx) {
        return ctx.blogPost.findOne(args)
      },
    })
    t.connectionField("allBlogPosts", {
      type: "BlogPost",
      additionalArgs: {
        orderBy: "BlogPostOrderBy",
      },
      async nodes(_root, args, ctx) {
        return ctx.blogPost.findMany(args)
      },
    })
  },
})

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createBlogPost", {
      type: "BlogPost",
      args: {
        title: stringArg({ required: true }),
        content: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.blogPost.create({
          title: args.title,
          content: args.content,
        })
      },
    })

    // t.field("votePost", {
    //   type: "Post",
    //   args: {
    //     id: stringArg({ required: true }),
    //   },
    //   async resolve(_root, args, ctx) {
    //     return ctx.post.votePost(args)
    //   },
    // })
  },
})
