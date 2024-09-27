const migrateUUID = sequelize => {
  return {
    uuid: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4
    }
  }
}
export default migrateUUID