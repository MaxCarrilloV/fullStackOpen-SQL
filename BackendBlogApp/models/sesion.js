const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../util/db")

class Sesion extends Model {}

Sesion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.TEXT,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "sesion",
  }
)
module.exports = Sesion