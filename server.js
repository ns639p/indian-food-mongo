const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const express = require('express');
const dishRouter = require('./routes/dishRoutes.js');
const app = express();

// Connect to database
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URI)
  .then((conn) => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/dishes', dishRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});