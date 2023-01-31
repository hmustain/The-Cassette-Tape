const sequelize = require("../config/connection");
const { User, Event, UserEvent } = require("../models");

const userData = require("./userData.json");
const eventData = require("./eventData.json");
const userEventData = require("./userEventData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n--DATABASE SYNCED--\n")
  await User.bulkCreate(userData);
  console.log("\n--Users seeded--\n");
  await Event.bulkCreate(eventData);
  console.log("\n--Events seeded--\n");
  await UserEvent.bulkCreate(userEventData);
  console.log("\n--User Events seeded--\n");

  process.exit(0);
};

seedDatabase();
