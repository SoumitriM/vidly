const Joi = require('joi');
const {Movie,validateMovie} = require('../models/movie')
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const url = 'mongodb://127.0.0.1:27017/vidly';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get('/', async(req,res)=>{
    const movies = await Movie.find().sort('genre.name');
    res.send(movies);
})

router.post('/',async (req,res)=>{
    const {error} = validateMovie(req.body);
    if(error){
       res.status(400).send(error.details[0].message);
    }
   else{
        let _genre = await Genre.findById(req.body.genreId);
        if(!_genre){
            res.status(400).send("invalid Genre ID.");
        }
        else{
            let movie = await new Movie({
                title: req.body.title,
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate,
                genre: _genre
            });
            movie = await movie.save();
            res.send(movie);
        }
    }
});

module.exports = router;
