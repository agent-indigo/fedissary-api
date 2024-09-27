import {Model, DataTypes} from 'sequelize'
import createUUID from '../utilities/createUUID'
import sequelize from '../utilities/sequelize'
class ActionModel extends Model {}
ActionModel.init({
  ...createUUID(),
  user: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'uuid'
    }
  },
  post: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'post',
      key: 'uuid'
    }
  },
  type: {
    type: DataTypes.ENUM(
      'bookmark',
      'like',
      'share'
    )
  }
}, {
  sequelize,
  modelName: 'like',
  tableName: 'likes',
  timestamps: true
})
ActionModel.belongsTo(PostModel, {
  foreignKey: 'post',
  as: 'post'
})
ActionModel.belongsTo(UserModel, {
  foreignKey: 'user',
  as: 'user'
})
ActionModel.hasMany(ActivityModel, {
  foreignKey: 'targetUUID',
  as: 'activities'
})
export default ActionModel