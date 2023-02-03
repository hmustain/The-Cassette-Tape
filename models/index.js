// References the models for this application
const User = require("./User");
const Event = require("./Event");
const UserEvent = require("./UserEvent");
const Song = require("./Song");

// Creates a relation between User and Event, preventing duplicate id issues.
User.belongsToMany(Event, {
  foreignKey: "user_id",
  through: UserEvent, as: "user_events",
  onDelete: "CASCADE",
});

// Creates a relation between Event and User, preventing duplicate ids.
Event.belongsToMany(User, {
  through: UserEvent, as: "event_users",
  foreignKey: "event_id",
});

// Creates a relation between Events and Songs, allowing many events to have the same songs.
Event.belongsToMany(Song, {
  through: UserEvent, as: "event_songs",
  foreignKey: "event_id",
});

// Creates a relation between Songs and Events, allowing many songs to belong to multiple events.
Song.belongsToMany(Event, {
  through: UserEvent, as: "song_events",
  foreignKey: "esong_id",
});


module.exports = { User, Event, UserEvent, Song };
