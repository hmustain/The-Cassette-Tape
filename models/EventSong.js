const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class EventSong extends Model {}

EventSong.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    song_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "eventSong",
  }
);

module.exports = EventSong;
