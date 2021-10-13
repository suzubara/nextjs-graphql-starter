import { gql } from '@apollo/client'

export default gql`
  type Todo {
    id: ID!
    label: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo!]
  }

  type Mutation {
    addTodo(label: String!): Todo
    completeTodo(id: ID!): Todo
  }
`
