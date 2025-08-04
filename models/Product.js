const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.STRING,
  images: DataTypes.STRING
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;

