const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserEvent extends Model { }

// model creation for UserEvent
UserEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "event",
        key: "id",
      },
    },
    esong_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "song",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "userEvent",
  }
);

// links the model to other files
module.exports = UserEvent;
