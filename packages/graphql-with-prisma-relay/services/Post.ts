import { PrismaClient } from "@prisma/client"
import { PaginationArgs, relayToPrismaPagination } from "./utils"
import { fromGlobalId } from "graphql-relay"

export class BlogPostService {
  constructor(protected prisma: PrismaClient) {}

  async findOne(params: { id: string }) {
    const user = await this.prisma.blogPost.findOne({
      where: { id: fromGlobalId(params.id).id },
    })

    if (!user) {
      throw new Error("could not find blog post with id: " + params.id)
    }

    return user
  }

  async findMany(params: PaginationArgs) {
    return this.prisma.blogPost.findMany({
      ...relayToPrismaPagination(params),
    })
  }

  async create(params: { title: string; content: string }) {
    return this.prisma.blogPost.create({
      data: params,
    })
  }
}
