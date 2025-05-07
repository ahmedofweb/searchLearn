import React, { useState, useRef } from 'react';
import { FaVolumeUp } from "react-icons/fa";

const Result = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false); // State for tracking whether audio is playing
  const audioRef = useRef(null); // Reference to the audio element

  // Get the first available audio and text pronunciation
  const phonetic = data.phonetics?.find(p => p.audio || p.text) || {};
  const audioSrc = phonetic.audio || null;
  const phoneticText = phonetic.text || '';

  const playAudio = () => {
    if (audioRef.current && audioSrc) {
      if (!isPlaying) {
        audioRef.current.play(); // Play the audio
        setIsPlaying(true); // Set isPlaying to true
      } else {
        audioRef.current.pause(); // Pause the audio
        setIsPlaying(false); // Set isPlaying to false
      }
    }
  };

  // Handle audio end to reset the color
  const handleAudioEnd = () => {
    setIsPlaying(false); // Reset state when audio ends
  };

  return (
    <div className="info">
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ margin: 0 }}>{data.word}</h2>
        {phoneticText && (
          <span style={{ fontStyle: 'italic', color: '#555' }}>{phoneticText}</span>
        )}
        <p
          className="play-btn"
          id="playButton"
          onClick={playAudio}
          style={{
            color: isPlaying ? 'red' : 'white', // Green when playing, white when paused
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <FaVolumeUp />
        </p>
        {audioSrc && <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnd} />}
      </div>

      {data.meanings.map((meaning, idx) => (
        <div key={idx}>
          <h3>{meaning.partOfSpeech}</h3>
          <ul>
            {meaning.definitions.map((def, i) => (
              <li key={i}>{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Result;
