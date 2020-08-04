import { makeSchema, connectionPlugin } from "@nexus/schema"
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import * as path from "path"
import * as typeDefs from "./definitions"

export const schema = makeSchema({
  types: typeDefs,
  outputs: {
    typegen: path.join(__dirname, "..", "nexus-typegen.ts"),
    schema: path.join(__dirname, "..", "schema.graphql"),
  },

  plugins: [
    nexusSchemaPrisma({
      outputs: {
        typegen: path.join(__dirname, "..", "nexus-prisma-typegen.ts"),
      },
    }),
  ],
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(
          __dirname,
          "..",
          "node_modules",
          ".prisma",
          "client",
          "index.d.ts",
        ),
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "ctx",
      },
    ],
    contextType: "ctx.Context",
  },
})

export default schema
