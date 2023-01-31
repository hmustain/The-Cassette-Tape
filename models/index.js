const User = require("./User");
const Event = require("./Event");
const UserEvent = require("./UserEvent");

User.hasMany(Event, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Event.belongsToMany(User, {
  foreignKey: "user_id",
});

module.exports = { User, Event, UserEvent };
