import {Model, DataTypes} from 'sequelize'
import createUUID from '../utilities/createUUID'
import sequelize from '../utilities/sequelize'
class PostModel extends Model {}
PostModel.init({
  ...createUUID(),
  attributedTo: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'uuid'
    }
  },
  inReplyTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'post',
      key: 'uuid'
    }
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  replyCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  likeCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  shareCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  bookmarkCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'post',
  tableName: 'posts',
  timestamps: true
})
PostModel.belongsTo(PostModel, {
  foreignKey: 'inReplyTo',
  as: 'inReplyTo'
})
PostModel.belongsTo(UserModel, {
  foreignKey: 'attributedTo',
  as: 'attributedTo'
})
PostModel.hasMany(ActivityModel, {
  foreignKey: 'targetUUID',
  as: 'activities'
})
PostModel.hasMany(ActionModel, {
  foreignKey: 'post',
  as: 'actions'
})
PostModel.hasMany(PostModel, {
  foreignKey: 'inReplyTo',
  as: 'replies'
})
export default PostModel