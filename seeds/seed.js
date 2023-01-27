const sequelize = require("../config/connection");
const { User, Event, userEvent } = require("../models");

const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  
  process.exit(0);
};

seedDatabase();
