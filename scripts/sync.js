const sequelize = require('../config/db');
const Admin = require('../models/Admin');

sequelize.sync({ alter: true }) // or { force: true } if you want to drop and recreate
  .then(() => {
    console.log('✅ Admin table created/updated');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Failed to sync:', err);
    process.exit(1);
  });
