require('dotenv').config(); // أضف هذا السطر في الأعلى

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // اسم قاعدة البيانات
  process.env.DB_USER,      // اسم المستخدم
  process.env.DB_PASSWORD,  // كلمة السر
  {
    host: process.env.DB_HOST, // عنوان السيرفر
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
