const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Train = sequelize.define("Train", {
  trainNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trainName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstClassCompartments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  secondClassCompartments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thirdClassCompartments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  arrival: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  originValue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  destinationValue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stops: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  days: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Train;
