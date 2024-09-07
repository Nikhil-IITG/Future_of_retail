import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onItemFound }) {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/items/search', {
                params: { objName: query }
            });
            const items = response.data;
            if (items.length > 0) {
                onItemFound(items[0]); // Assuming we are locating the first match
                setError('');
            } else {
                setError('No item found');
            }
        } catch (err) {
            setError('Error searching for item');
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an item..."
                className="form-control"
            />
            <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
            {error && <div className="text-danger mt-2">{error}</div>}
        </div>
    );
}

export default SearchBar;
