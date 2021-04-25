var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    cathegory: { 
        type: String,
        enum: ['CD MUSIC', 'DVD MOVIE', 'TV SERIE']
    },
    name: { type: String, unique: true },
    price: String,
});

module.exports = mongoose.model('User', userSchema);