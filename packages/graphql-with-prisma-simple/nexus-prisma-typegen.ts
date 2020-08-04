import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Post: Prisma.Post
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    posts: {
      filtering: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'url' | 'votes' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'url' | 'votes'
    }
    users: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName' | 'password' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName' | 'password'
    }
  },
  Post: {

  }
  User: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    post: 'Post'
    posts: 'Post'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'BatchPayload'
    deleteOnePost: 'Post'
    deleteManyPost: 'BatchPayload'
    upsertOnePost: 'Post'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
  },
  Post: {
    id: 'String'
    title: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    url: 'String'
    votes: 'Int'
  }
  User: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    lastName: 'String'
    password: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Post: Typegen.NexusPrismaFields<'Post'>
  User: Typegen.NexusPrismaFields<'User'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  