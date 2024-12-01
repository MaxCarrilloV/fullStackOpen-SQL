const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sesions", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        token:{
            type: DataTypes.TEXT,
            unique:true
        }
    });
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable("sesion")
  }
}
