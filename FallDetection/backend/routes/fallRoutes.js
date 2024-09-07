const express = require('express');
const Fall = require('../models/Fall');
const router = express.Router();

router.post('/log', async (req, res) => {
    const { location, x, y } = req.body;
    const fall = new Fall({ location, x, y });
    await fall.save();
    res.status(201).json(fall);
});

module.exports = router;
