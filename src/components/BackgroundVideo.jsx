import React from 'react';

export default function BackgroundVideo() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -20,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      {/* 3D Spinning SwachhCoin Cinematic Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.65) contrast(1.15)'
        }}
        src="/assets/swachhcoin-spin.mp4"
      />

      {/* Atmospheric Glassmorphic Scrim / Overlay for optimal text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(6, 78, 59, 0.45) 0%, rgba(2, 6, 23, 0.88) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)'
        }}
      />
    </div>
  );
}
