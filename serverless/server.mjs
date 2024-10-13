import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { sequelize } from './db/db.config.mjs'

import { resolvers } from './graphql/resolvers.mjs'
import { typeDefs } from './graphql/typeDefs.mjs'

// Configuração para subir o backend
const startServer = async () => {
  await sequelize.sync()
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startServer()
