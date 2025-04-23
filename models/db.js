const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: false,
  }
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectToDatabase };