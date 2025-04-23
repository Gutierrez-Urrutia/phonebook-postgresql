const { Sequelize } = require('sequelize');
require('dotenv').config();

let config = {
  logging: false,
};

if(process.env.NODE_ENV === 'production'){
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
};

const sequelize = new Sequelize(process.env.DATABASE_URL, config);
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectToDatabase };