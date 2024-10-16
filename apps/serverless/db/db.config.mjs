import { Sequelize, DataTypes, Model } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite'
})

export class TodoList extends Model {}
TodoList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    done: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  { sequelize, modelName: 'todo_list' }
)
