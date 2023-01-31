const User = require("./User");
const Event = require("./Event");
const UserEvent = require("./UserEvent");
const EventSong = require("./EventSong");

User.belongsToMany(Event, {
  foreignKey: "user_id",
  through: UserEvent, as: "user_events",
  onDelete: "CASCADE",
});

Event.belongsToMany(User, {
  through: UserEvent, as: "event_users",
  foreignKey: "event_id",
});


module.exports = { User, Event, UserEvent, EventSong };
