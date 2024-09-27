import {Model, DataTypes} from 'sequelize'
import createUUID from '../utilities/createUUID'
import sequelize from '../utilities/sequelize'
class UserModel extends Model {}
UserModel.init({
  ...createUUID(),
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notContains: {
        args: [' '],
        msg: 'Spaces can\'t be used here.'
      }
    }
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM(
      'admin',
      'root',
      'user'
    ),
    allowNull: false,
    defaultValue: 'user'
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicKey: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  privateKey: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'users',
  timestamps: true,
  hooks: {
    async beforeCreate(user) {
      if (user.role === 'root') {
        if (await UserModel.findOne({
          where: {
            role: 'root'
          }
        })) {
          throw new Error(
            'There can be only one root user.'
          )
        }
      }
    }
  }
})
UserModel.hasMany(ActivityModel, {
  foreignKey: 'actor',
  as: 'activities'
})
UserModel.hasMany(PostModel, {
  foreignKey: 'user',
  as: 'posts'
})
UserModel.hasMany(ActionModel, {
  foreignKey: 'user',
  as: 'actions'
})
export default UserModel