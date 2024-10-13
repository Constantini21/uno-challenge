import { Op } from 'sequelize'

import { TodoList } from '../db/db.config.mjs'

export const resolvers = {
  Query: {
    todoList: async (_, { filter }) => {
      return !filter?.name
        ? TodoList.findAll()
        : TodoList.findAll({
            where: {
              name: { [Op.like]: `%${filter.name.toLowerCase()}%` }
            }
          })
    }
  },

  Mutation: {
    addItem: async (_, { values: { name } }) => {
      await TodoList.create({ name })
    },
    updateItem: (_, { values: { id, name } }) => {
      // Aqui você irá implementar a edição do item
      console.log(id, name)
    },
    deleteItem: async (_, { id }) => {
      await TodoList.destroy({ where: { id } })
    }
  }
}
