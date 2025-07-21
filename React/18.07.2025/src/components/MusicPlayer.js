import React, { useState } from "react";

export function MusicPlayer(params) {
    const [tracks, setTracks] = useState([
        { id: 1, title: "Title 1", artist: "Artist 1", isPlaying: false },
        { id: 2, title: "Title 2", artist: "Artist 2", isPlaying: false },
        { id: 3, title: "Title 3", artist: "Artist 3", isPlaying: false },
      ]);
    const [currentTrackId, setCurrentTrackId] = useState(null)
    const [volume, setVolume] = useState(50);

    function togglePlay(trackId) {
        const updatedTracks = tracks.map(track =>
        {
            if (trackId === track.id) 
            {
                return {...track, isPlaying: !track.isPlaying};
            }
            else
            {
                return {...track, isPlaying: false};
            }
        }
        )
        const playing = tracks.find(t => t.id === trackId).isPlaying;
        
        setTracks(updatedTracks);
        setCurrentTrackId(playing ? null : trackId)
    }
    function stopAll()
    {
        const stoppedTracks = tracks.map((track) => 
        ({
            ...track,
            isPlaying: false,
        }));

        setTracks(stoppedTracks);
        setCurrentTrackId(null);
    }
    function handleVolumeChange(event)
    {
        setVolume(+event.target.value);
    }
    
    const playingCount = tracks.filter(t => t.isPlaying).length;
    return (
    <div style={styles.container}>
        <h2>My Music Player</h2>
        <div style={styles.controls}>
        Volume: {volume}
        <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
        />
        <button onClick={stopAll}>Stop All</button>
        </div>
        <div>
        Tracks count: {tracks.length} : Now playing: {playingCount}
        </div>
        <ul
        style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
        }}
        >
        {tracks.map((track) => (
            <li
            key={track.id}
            style={{
                background: track.isPlaying ? "#007BFF4F" : "white",
                color: track.isPlaying ? "white" : "black",
                display: "flex",
                alignItems: 'center',
                padding: '16px',
                borderRadius: '16px',
                gap: 16,
            }}
            >
            <strong>
                {track.title} by {track.artist}
            </strong>
            <button
                onClick={() => togglePlay(track.id)}
                style={{...styles.button, backgroundColor: track.isPlaying ? "pink" : "#007BFF"}}
            >
                {track.isPlaying ? "Pause" : "Play"}
            </button>
            </li>
        ))}
        </ul>
        {currentTrackId && (
        <div>
            <h3>
            {
                tracks.find(
                (t) => t.id === currentTrackId
                ).title
            }
            </h3>
            <p>
            {
                tracks.find(
                (t) => t.id === currentTrackId
                ).artist
            }
            </p>
        </div>
        )}
    </div>
    );
}

  
const styles = {
    container: {
        maxWidth: "500px",
        margin: "0 auto",
    },
    button: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
    },
    controls: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
};