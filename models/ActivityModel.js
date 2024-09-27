import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize'
import createUUID from '../utilities/createUUID'
import sequelize from '../utilities/sequelize'
class ActivityModel extends Model {}
ActivityModel.init({
  ...createUUID(),
  actor: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'uuid'
    }
  },
  type: {
    type: DataTypes.ENUM(
      'create',
      'delete',
      'edit'
    ),
    allowNull: false
  },
  targetClass: {
    type: DataTypes.ENUM(
      'like',
      'post',
      'user'
    ),
    allowNull: false
  },
  targetUUID: {
    type: DataTypes.UUID,
    allowNull: false
  },
  published: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  sequelize,
  modelName: 'activity',
  tableName: 'activities',
  timestamps: true
})
ActivityModel.belongsTo(ActionModel, {
  foreignKey: 'targetUUID',
  as: 'targetUUID',
  constraints: false
})
ActivityModel.belongsTo(PostModel, {
  foreignKey: 'targetUUID',
  as: 'targetUUID',
  constraints: false
})
ActivityModel.belongsTo(UserModel, {
  foreignKey: 'targetUUID',
  as: 'targetUUID',
  constraints: false
})
ActivityModel.belongsTo(UserModel, {
  foreignKey: 'actor',
  as: 'actor'
})
export default ActivityModel