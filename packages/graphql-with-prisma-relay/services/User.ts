import { PrismaClient } from "@prisma/client"
import { fromGlobalId } from "graphql-relay"
import { PaginationArgs, relayToPrismaPagination } from "./utils"

export class UserService {
  constructor(protected prisma: PrismaClient) {}

  async findOne(params: { id: string }) {
    const user = await this.prisma.user.findOne({
      where: { id: fromGlobalId(params.id).id },
    })

    if (!user) {
      throw new Error("could not find user with id: " + params.id)
    }

    return user
  }

  findMany(params: PaginationArgs) {
    return this.prisma.user.findMany({
      ...relayToPrismaPagination(params),
    })
  }
}
