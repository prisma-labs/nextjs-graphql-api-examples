import { UserService } from "./User"
import { BlogPostService } from "./Post"
import { PrismaClient } from "@prisma/client"

export interface Services {
  user: UserService,
  blogPost: BlogPostService
}

export function buildServices(prisma: PrismaClient): Services {
  return {
    user: new UserService(prisma),
    blogPost: new BlogPostService(prisma),
  }
}
