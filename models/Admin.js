const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs'); 

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'admins',      // ⬅️ أضف هذه السطر
  timestamps: true          // ⬅️ إذا جدولك فيه createdAt و updatedAt
});

Admin.beforeCreate(async (admin, options) => {
  if (admin.passwordHash) {
    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(admin.passwordHash, salt);
  }
});

Admin.beforeUpdate(async (admin, options) => {
  if (admin.changed('passwordHash')) {
    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(admin.passwordHash, salt);
  }
});

module.exports = Admin;
