import React from 'react';
import './Map.css';

function Map({ floorMap, fallAlerts, searchedItem }) {
    return (
        <div className="map-container">
            <img src={floorMap} alt="Store Map" className="map-image" />
            {fallAlerts.map((alert, index) => (
                <div
                    key={index}
                    className="alert-dot"
                    style={{
                        top: `${alert.y}%`,
                        left: `${alert.x}%`,
                    }}
                    title={`Fall detected at ${alert.location}`}
                ></div>
            ))}
            {searchedItem && (
                <div
                    className="searched-item-dot"
                    style={{
                        top: `${searchedItem.y}%`,
                        left: `${searchedItem.x}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    title={`Found: ${searchedItem.objName}`}
                ></div>
            )}
        </div>
    );
}

export default Map;
