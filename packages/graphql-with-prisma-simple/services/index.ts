import { UserService } from "./User"
import { PostService } from "./Post"
import { PrismaClient } from "@prisma/client"

export { UserService, PostService }

export function buildServices(prisma: PrismaClient) {
  return {
    user: new UserService(prisma),
    post: new PostService(prisma),
  }
}
