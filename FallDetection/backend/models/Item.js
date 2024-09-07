const mongoose = require('mongoose');

// Define the Item schema
const ItemSchema = new mongoose.Schema({
    objID: { type: String, required: true, unique: true },
    objName: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    floor: { type: String, required: true } // New floor field (e.g., 'floor1', 'floor2', 'floor3')
});

// Create the Item model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
