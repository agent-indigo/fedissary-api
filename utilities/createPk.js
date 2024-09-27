import {DataTypes} from 'sequelize'
const createPk = () => {
  return {
    pk: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }
}
export default createPk