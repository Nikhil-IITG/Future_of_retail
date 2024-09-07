const mongoose = require('mongoose');
const Camera = require('./models/Camera');

// Connect to MongoDB
mongoose.connect('mongodb+srv://bhavuk:bhavuk@walmarthackathon.oqb96by.mongodb.net/?retryWrites=true&w=majority&appName=walmarthackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Sample cameras to insert
    const cameras = [
        { cameraID: 'camera1', floor: 'floor1', x: 10, y: 20 },
        { cameraID: 'camera2', floor: 'floor1', x: 30, y: 50 },
        { cameraID: 'camera3', floor: 'floor2', x: 60, y: 40 },
        { cameraID: 'camera4', floor: 'floor2', x: 70, y: 80 },
        { cameraID: 'camera5', floor: 'floor3', x: 90, y: 30 },
        { cameraID: 'camera6', floor: 'floor3', x: 20, y: 70 }
    ];

    try {
        // Insert the sample cameras into the database
        await Camera.insertMany(cameras);
        console.log('Sample cameras inserted successfully');
    } catch (error) {
        console.error('Error inserting sample cameras:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
});
