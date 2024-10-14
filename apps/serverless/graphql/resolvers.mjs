import { Op } from 'sequelize'

import { TodoList } from '../db/db.config.mjs'

export const resolvers = {
  Query: {
    todoList: async (_, { filter }) => {
      return !filter?.name
        ? TodoList.findAll()
        : TodoList.findAll({
            where: {
              name: { [Op.like]: `%${filter.name.trim().toLowerCase()}%` }
            }
          })
    }
  },

  Mutation: {
    addItem: async (_, { values: { name } }) => {
      await TodoList.create({ name })
      return true
    },
    updateItem: async (_, { values: { id, ...rest } }) => {
      if (!id) throw new Error('O "id" é obrigatório.')

      await TodoList.update(rest, {
        where: {
          id
        }
      })

      return true
    },
    deleteItem: async (_, { id }) => {
      await TodoList.destroy({ where: { id } })
      return true
    }
  }
}
