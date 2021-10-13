import { ServerResponse } from 'http'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'
import type { Resolvers } from '@apollo/client'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { v4 } from 'uuid'

import typeDefs from './schema'

export const config: PageConfig = {
  api: { bodyParser: false },
}

type Todo = {
  id: string
  label: string
  done: boolean
}

const todos: Todo[] = []

const resolvers: Resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    addTodo: (root, args) => {
      const newTodo: Todo = {
        id: v4(),
        label: args.label,
        done: false,
      }

      todos.push(newTodo)

      return newTodo
    },
    completeTodo: (root, args) => {
      const { id } = args

      const todo = todos.find(i => i.id === id)

      if (!todo) {
        // throw an error
      } else if (todo.done) {
        // throw an error
      } else {
        todo.done = true
        return todo
      }
    }
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
