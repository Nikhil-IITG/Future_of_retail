const mongoose = require('mongoose');

const FallSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    location: String,
    x: Number,
    y: Number,
});

const Fall = mongoose.model('Fall', FallSchema);
module.exports = Fall;
