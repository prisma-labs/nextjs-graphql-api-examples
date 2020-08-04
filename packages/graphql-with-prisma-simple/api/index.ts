import { PrismaClient } from "@prisma/client"
import { graphqlHTTP } from "express-graphql"
import schema from "../schema"
import { buildServices } from "../services"

const prisma = new PrismaClient()

const allowCors = (fn: Function) => async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another option
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = graphqlHTTP(_ => ({
  schema,
  graphiql: true,
  pretty: true,
  context: {
    ...buildServices(prisma),
  },
}))

export default allowCors(handler)