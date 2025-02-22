const mongoose =require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true },
  ingredients: [{ type: String, required: true, trim: true, lowercase: true }], 
  diet: { type: String, trim: true, lowercase: true },
  prep_time: Number,
  cook_time: Number,
  flavor_profile: { type: String, trim: true, lowercase: true },
  course: { type: String, trim: true, lowercase: true },
  state: { type: String, trim: true, lowercase: true },
  region: { type: String, trim: true, lowercase: true }
});

// Index for text search on 'name'
dishSchema.index({ name: 'text' });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;

