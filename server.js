require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');

// ✅ import routes
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes'); // ✅ auth route
const adminRoutes = require('./routes/admin.routes');


const app = express();

const allowedOrigins = [
  'http://localhost:4200',    // أثناء التطوير
  'https://YOUR-FRONTEND.com' // ضع هنا دومين موقعك بعد النشر
];
app.use('/api/admins', adminRoutes);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy: This origin ' + origin + ' is not allowed!';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// ✅ static images
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// ✅ API routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // ✅ login endpoint

// ✅ test route
app.get('/', (req, res) => {
  res.send('Backend running');
});


app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack || err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// ✅ connect database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });
