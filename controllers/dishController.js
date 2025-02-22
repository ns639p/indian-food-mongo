const Dish = require('../models/dishModel.js');
const APIFeatures = require('../utils/apiFeatures.js');

exports.getAllDishes = async(req,res)=>{
    try{
        const features = new APIFeatures(Dish.find(),req.query).filter().sort().limitFields().paginate();
        const dishes = await features.query;
        res.status(200).json({
            status:'success',
            length:dishes.length,
            data:{
                dishes
            }
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error
          });
    }
    
}


exports.getDish = async(req,res)=>{
    try{
      
      const dish = await Dish.findOne({ name: req.params.name.toLowerCase() });
        if (!dish) return res.status(404).json({ 
        status: 'fail', 
        message: 'Dish not found' 
      });
        res.status(200).json({
            status:'success',
            data:{
                dish
            }
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error
          });
    }
}

exports.getDishesByIngredients = async (req, res) => {
    try {
      if (!req.query.ingredients) {
        return res.status(400).json({
          status: 'fail', 
          message: 'Ingredients query parameter is required' 
        });
    }
      const ingredients = req.query.ingredients.split(',').map(item => 
        new RegExp(item.trim(), 'i')
      )
      
      const dishes = await Dish.find({
        ingredients: { $all: ingredients }
      });
      
      res.status(200).json({
        status: 'success',
        results: dishes.length,
        data: { dishes }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };