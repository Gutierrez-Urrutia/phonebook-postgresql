const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Person = sequelize.define('Person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Person;