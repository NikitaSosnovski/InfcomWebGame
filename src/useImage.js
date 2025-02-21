import { useState, useEffect } from 'react';

const useImage = (src) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
      setError(null); // Clear any previous errors
    };
    img.onerror = (err) => {
      console.error('Image loading error:', err);
      setError(err); // Set the error state
    };
  }, [src]);

  return { image, error };
};

export default useImage;