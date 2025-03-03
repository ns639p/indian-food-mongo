const csv = require('csv-parser');
const fs = require('fs')
const Dish = require('../models/dishModel.js');
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/indian-food')
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

const results = [];

fs.createReadStream('indian_food.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Convert all fields to lowercase and trim spaces
    const cleanedData = {
      name: data.name.trim().toLowerCase(),
      ingredients: data.ingredients.split(',').map(ing => ing.trim().toLowerCase()), // Ensure lowercase
      diet: data.diet.trim().toLowerCase(),
      prep_time: data.prep_time === '-1' ? null : Number(data.prep_time),
      cook_time: data.cook_time === '-1' ? null : Number(data.cook_time),
      flavor_profile: data.flavor_profile.trim().toLowerCase(),
      course: data.course.trim().toLowerCase(),
      state: data.state === '-1' ? null : data.state.trim().toLowerCase(),
      region: data.region === '-1' ? null : data.region.trim().toLowerCase()
    };
    results.push(cleanedData);
  })
  .on('end', async () => {
    try {
      await Dish.deleteMany(); // Clear previous data
      await Dish.insertMany(results);
      console.log('Data seeded successfully!');
      mongoose.connection.close(); // Close connection after seeding
    } catch (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
  });
