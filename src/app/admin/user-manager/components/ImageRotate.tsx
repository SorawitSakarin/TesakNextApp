import React, { useState } from 'react';

interface ImageRotateProps {
  source: string;
  altText: string;
}
const ImageRotate: React.FC<ImageRotateProps> = ({ source, altText }) => {
  const [rotation, setRotation] = useState(0); // State variable to track rotation angle

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360); // Update rotation by 90 degrees with modulo to stay within 0-360 range
  };

  const mimeType = source.substring(5, source.indexOf(';base64,'));

  const isPdf = mimeType === 'application/pdf';
  if (isPdf) {
    return <iframe src={source} className='w-full h-full' title={altText} />;
  }
  return (
    <div onClick={handleRotate}>
      <img
        className={`w-full h-full origin-center`}
        src={`data:image/jpeg;base64,${source.split(';base64,')[1]}`}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}

        alt={altText}
      />
    </div>
  );
};

export default ImageRotate;
