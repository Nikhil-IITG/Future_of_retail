import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CustomNavbar from './components/Navbar';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import beepSound from './img/beep.mp3';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:3001');

// Function to dynamically load floor maps
const loadFloorMaps = (numFloors) => {
    const floorMaps = {};
    for (let i = 1; i <= numFloors; i++) {
        try {
            floorMaps[i] = require(`./img/floor${i}.png`);
        } catch (e) {
            console.error(`Error loading map for floor ${i}:`, e);
        }
    }
    return floorMaps;
};

function App() {
    const [floor, setFloor] = useState('floor1');
    const [fallAlerts, setFallAlerts] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);

    // Dynamically load maps for 3 floors; change the number to whatever your max floor is
    const floorMaps = loadFloorMaps(3);

    useEffect(() => {
        socket.on('fallAlert', (data) => {
            setFloor(data.location); // Switch to the floor where the emergency occurred
            setFallAlerts((prev) => [...prev, data]);
            new Audio(require('./img/beep.mp3')).play();
        });

        return () => {
            socket.off('fallAlert');
        };
    }, []);

    const handleFloorChange = (floor) => {
        setFloor(floor);
        setFallAlerts([]);
        setSearchedItem(null); // Clear item when changing floors
    };

    const handleItemFound = (item) => {
        setFloor(item.floor); // Switch to the floor where the item is located
        setSearchedItem(item);
    };

    // Check if floor is defined and valid
    const floorNumber = floor ? parseInt(floor.replace('floor', ''), 10) : 1;

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <CustomNavbar onSelectFloor={handleFloorChange} />
            <SearchBar onItemFound={handleItemFound} />
            <div className="flex-grow-1 position-relative">
                {floorMaps[floorNumber] ? (
                    <Map floorMap={floorMaps[floorNumber]} fallAlerts={fallAlerts} searchedItem={searchedItem} />
                ) : (
                    <div>Map not available for this floor</div>
                )}
            </div>
        </div>
    );
}

export default App;
