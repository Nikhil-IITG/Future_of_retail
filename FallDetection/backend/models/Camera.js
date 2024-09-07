const mongoose = require('mongoose');

// Define the Camera schema
const CameraSchema = new mongoose.Schema({
    cameraID: { type: String, required: true, unique: true },
    floor: { type: String, required: true }, // e.g., 'floor1', 'floor2', etc.
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});

// Create the Camera model
const Camera = mongoose.model('Camera', CameraSchema);

module.exports = Camera;
