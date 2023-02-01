const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Playlist extends Model {}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    modelName: "playlist",
  }
);

module.exports = Playlist;
