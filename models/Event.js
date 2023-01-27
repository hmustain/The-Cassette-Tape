const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    songList: {
      type: DataTypes.JSON([]), //awaiting spotify songs
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
