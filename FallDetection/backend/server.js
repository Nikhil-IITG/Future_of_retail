const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Fall = require('./models/Fall');
const itemRoutes = require('./routes/itemRoutes');
const cameraRoutes = require('./routes/cameraRoutes'); // Import the camera routes

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

mongoose.connect('mongodb+srv://bhavuk:bhavuk@walmarthackathon.oqb96by.mongodb.net/?retryWrites=true&w=majority&appName=walmarthackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/cameras', cameraRoutes); // Use the camera routes

io.on('connection', (socket) => {
    console.log('A client connected');
    
    socket.on('fallDetected', async (data) => {
        const fall = new Fall(data);
        await fall.save();
        io.emit('fallAlert', data); // Emit data with floor information
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
