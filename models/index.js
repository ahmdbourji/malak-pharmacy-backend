const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('malak_pharmacy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+03:00',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./Product')(sequelize, DataTypes);

module.exports = db;
