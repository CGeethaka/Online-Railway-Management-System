const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Booking = sequelize.define("Booking", {
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trainNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bookingDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Booking;
