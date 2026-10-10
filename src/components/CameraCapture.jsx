import React from 'react';
import PhotoUpload from './PhotoUpload';

// Fallback wrapper in case CameraCapture is imported anywhere else
export default function CameraCapture({ label, onCapture }) {
  return (
    <PhotoUpload
      label={label}
      onImageSelect={onCapture}
    />
  );
}