const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model { }

Event.init(
    id: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        
  }  
)
