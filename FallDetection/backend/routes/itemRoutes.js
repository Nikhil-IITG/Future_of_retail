const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Route to add a new item
router.post('/add', async (req, res) => {
    const { objID, objName, x, y, floor } = req.body;

    try {
        const item = new Item({ objID, objName, x, y, floor });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to search for items by name
router.get('/search', async (req, res) => {
    const { objName } = req.query;

    try {
        const items = await Item.find({ objName: new RegExp(objName, 'i') });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
