// scripts/createAdmin.js
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function createAdmin() {
  const passwordHash = await bcrypt.hash('malakbawari76127725adel', 10); // choose your password here
  await Admin.create({ username: 'malakbawari', passwordHash });
  console.log('Admin user created');
}

createAdmin();
