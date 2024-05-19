// frontend/src/pages/Artists.js
import React, { useEffect, useState } from 'react';

const Artists = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/artists');
                const data = await response.json();
                setArtists(data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <ul>
            {artists.map(artist => (
                <li key={artist.id}>
                    <a href={`/artists/${artist.id}`}>{artist.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default Artists;
