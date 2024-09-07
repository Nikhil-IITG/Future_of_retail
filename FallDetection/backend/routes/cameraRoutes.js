const express = require('express');
const Camera = require('../models/Camera');
const router = express.Router();

// Route to add a new camera
router.post('/add', async (req, res) => {
    const { cameraID, floor, x, y } = req.body;

    try {
        const camera = new Camera({ cameraID, floor, x, y });
        await camera.save();
        res.status(201).json(camera);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a camera by ID
router.get('/:id', async (req, res) => {
    try {
        const camera = await Camera.findOne({ cameraID: req.params.id });
        if (camera) {
            res.status(200).json(camera);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
