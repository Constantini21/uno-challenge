export const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    done: Int
  }

  input ItemInput {
    id: Int
    name: String
    done: Int
  }

  input ItemFilter {
    id: Int
    name: String
  }

  type Query {
    todoList(filter: ItemFilter): [Item]
  }

  type Mutation {
    addItem(values: ItemInput): Boolean
    updateItem(values: ItemInput): Boolean
    deleteItem(id: Int!): Boolean
  }
`
