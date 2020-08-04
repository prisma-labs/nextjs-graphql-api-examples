import { PrismaClient, UserCreateInput, PostCreateInput } from "@prisma/client"
import faker from "faker"

async function seed() {
  const prisma = new PrismaClient()

  const userPromises = Array.from(Array(20).keys()).map(_ => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const user: UserCreateInput = {
      firstName,
      lastName,
      email: faker.internet.exampleEmail(firstName, lastName),
      password: faker.random.uuid(),
    }

    return prisma.user.create({
      data: user,
    })
  })

  const postPromises = Array.from(Array(30).keys()).map(_ => {
    const post: PostCreateInput = {
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      votes: faker.random.number(100),
    }

    return prisma.post.create({
      data: post,
    })
  })

  await Promise.all([...userPromises, ...postPromises] as Promise<any>[])

  await prisma.disconnect()

  console.log('Seeded db!')
}

seed()
