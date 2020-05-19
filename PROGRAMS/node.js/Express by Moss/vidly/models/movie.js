const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('genre', genreSchema);
const movieSchema = mongoose.Schema({
    title :{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 10
    },
    genre:{
        type: genreSchema
    }
});


const Movie = mongoose.model('movie', movieSchema);

async function validateMovie(movie){
    const schema = {
        title: Joi.string().min(2).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(10).required(),
        genreId : Joi.string()
    }
    return Joi.validate(movie,schema);

}
exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.Genre = Genre;