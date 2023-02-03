const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Song extends Model { }

// Model creation for Song
Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    song_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "song",
  }
);

// this links the model to other files
module.exports = Song;
