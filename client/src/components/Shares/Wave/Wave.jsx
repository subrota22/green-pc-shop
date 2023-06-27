import React from 'react';
import Wave from 'react-wavify';
const WaveStart = () => {
    return (
        <>
 <Wave fill="url(#gradient)">
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="5%"  stopColor="#24CAB9" />
      <stop offset="75%" stopColor="#6B0966" />
    </linearGradient>
  </defs>
</Wave>
  
        </>
    );
};

export default WaveStart;