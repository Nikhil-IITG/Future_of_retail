const mongoose = require('mongoose');
const Item = require('./models/Item'); // Ensure your Item model is defined properly

// Connect to MongoDB
mongoose.connect('mongodb+srv://bhavuk:bhavuk@walmarthackathon.oqb96by.mongodb.net/?retryWrites=true&w=majority&appName=walmarthackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Sample items to insert
    const items = [
        { objID: '1', objName: 'Laptop', x: 18, y: 65, floor: 'floor1' },
        { objID: '2', objName: 'Smartphone', x: 16, y: 22, floor: 'floor1' },
        { objID: '7', objName: 'Monitor', x: 14, y: 18, floor: 'floor1' },
        { objID: '10', objName: 'Printer', x: 12, y: 19, floor: 'floor1' },
        { objID: '3', objName: 'Tablet', x: 30, y: 40, floor: 'floor2' },
        { objID: '4', objName: 'Headphones', x: 32, y: 42, floor: 'floor2' },
        { objID: '8', objName: 'Keyboard', x: 31, y: 41, floor: 'floor2' },
        { objID: '5', objName: 'TV', x: 50, y: 60, floor: 'floor3' },
        { objID: '6', objName: 'Camera', x: 52, y: 61, floor: 'floor3' },
        { objID: '9', objName: 'Mouse', x: 51, y: 59, floor: 'floor3' }
    ];

    try {
        // Insert the sample items into the database
        await Item.insertMany(items);
        console.log('Sample items inserted successfully');
    } catch (error) {
        console.error('Error inserting sample items:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
});
