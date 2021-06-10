import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import { context } from './context'
import { schema } from './schema'

const { PORT = 5000 } = process.env

const app = express()

const apollo = new ApolloServer({
  schema,
  context,
  tracing: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
})

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))

apollo.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: '*',
  },
})

app.listen({ port: PORT }, () => {
  process.stdout.write(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`
  )
})
