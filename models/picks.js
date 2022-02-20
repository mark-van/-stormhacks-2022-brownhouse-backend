const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PicksSchema = new Schema({
    id: Number,
    movies: Number //[Number]
});

module.exports = mongoose.model('Picks', PicksSchema);