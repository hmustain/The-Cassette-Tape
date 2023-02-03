const User = require("./User");
const Event = require("./Event");
const UserEvent = require("./UserEvent");
const Song = require("./Song");
const Playlist = require("./Playlist");

User.belongsToMany(Event, {
  foreignKey: "user_id",
  through: UserEvent, as: "user_events",
  onDelete: "CASCADE",
});

Event.belongsToMany(User, {
  through: UserEvent, as: "user_events",
  foreignKey: "event_id",
});

Playlist.hasMany(Song, {
  foreignKey: "esong_id",
});

Song.belongsTo(Playlist, {
  foreignKey: "playlist_id",
});

Playlist.belongsTo(Event, {
  foreignKey: "event_id",
});


module.exports = { User, Event, UserEvent, Song, Playlist };
