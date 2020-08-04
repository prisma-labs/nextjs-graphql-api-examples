import { PrismaClient, FindManyUserArgs } from "@prisma/client"
import { PaginationArgs, offsetToPrismaPagination } from "./utils"

export class UserService {
  constructor(protected prisma: PrismaClient) {}

  async findOne(params: { id: string }) {
    const user = await this.prisma.user.findOne({ where: { id: params.id } })

    if (!user) {
      throw new Error("could not find user with id: " + params.id)
    }

    return user
  }

  findMany(
    params: PaginationArgs & { orderBy?: FindManyUserArgs["orderBy"] | null },
  ) {
    return this.prisma.user.findMany({
      ...offsetToPrismaPagination(params),
      orderBy: params.orderBy ?? undefined,
    })
  }

  async count() {
    return this.prisma.post.count()
  }
}
