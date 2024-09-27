const migratePk = sequelize => {
  return {
    pk: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4
    }
  }
}
export default migratePk