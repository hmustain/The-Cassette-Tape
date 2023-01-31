const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    starting_date: {
      type: DataTypes.DATE,
      allownull: true,
    },
    ending_date: {
      type: DataTypes.DATE,
      allownull: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
