import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server"
import schema from "../schema"
import { buildServices } from "../services"

const prisma = new PrismaClient()

const server = new ApolloServer({
  schema,
  context: () => {
    return buildServices(prisma)
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
