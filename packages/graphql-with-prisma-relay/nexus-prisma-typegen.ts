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
  BlogPost: Prisma.BlogPost
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    blogPosts: {
      filtering: 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'title' | 'content' | 'createdAt' | 'updatedAt'
    }
    users: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName' | 'password' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName' | 'password'
    }
  },
  BlogPost: {

  }
  User: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    blogPost: 'BlogPost'
    blogPosts: 'BlogPost'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOneBlogPost: 'BlogPost'
    updateOneBlogPost: 'BlogPost'
    updateManyBlogPost: 'BatchPayload'
    deleteOneBlogPost: 'BlogPost'
    deleteManyBlogPost: 'BatchPayload'
    upsertOneBlogPost: 'BlogPost'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
  },
  BlogPost: {
    id: 'String'
    title: 'String'
    content: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
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
  BlogPost: Typegen.NexusPrismaFields<'BlogPost'>
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
  