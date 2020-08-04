import { PrismaClient, FindManyPostArgs } from "@prisma/client"
import { PaginationArgs, offsetToPrismaPagination } from "./utils"

export class PostService {
  constructor(protected prisma: PrismaClient) {}

  async findOne(params: { id: string }) {
    const user = await this.prisma.post.findOne({ where: { id: params.id } })

    if (!user) {
      throw new Error("could not find post with id: " + params.id)
    }

    return user
  }

  async findMany(
    params: PaginationArgs & { orderBy?: FindManyPostArgs["orderBy"] | null },
  ) {
    return this.prisma.post.findMany({
      ...offsetToPrismaPagination(params),
      orderBy: params.orderBy ?? undefined,
    })
  }

  async count() {
    return this.prisma.post.count()
  }

  async create(params: { title: string; url: string }) {
    return this.prisma.post.create({
      data: params,
    })
  }

  async votePost(params: { id: string }) {
    const currentPost = await this.findOne({ id: params.id })

    const updatePost = await this.prisma.post.update({
      where: { id: params.id },
      data: { votes: currentPost.votes + 1 },
    })

    return updatePost
  }
}
