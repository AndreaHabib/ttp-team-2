const Sequelize = require("sequelize");
const db = require("../db");

const Zipcode = db.define("zipcode", {
  zipCode: {
    type: Sequelize.STRING,
    // primaryKey: true,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Zipcode;
