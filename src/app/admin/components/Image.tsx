import React from 'react';
interface ImageProps {
  source: string;
  altText: string;
}
const Image: React.FC<ImageProps> = ({ source, altText }) => {
  const mimeType = source.substring(5, source.indexOf(';base64,'));

  const isPdf = mimeType === 'application/pdf';
  if (isPdf) {
    return <iframe src={source} className='w-full h-full' title={altText} />;
  } else {
    return (
      <img
        src={`data:image/jpeg;base64,${source.split(';base64,')[1]}`}
        className='w-full h-full'
        alt={altText}
      />
    );
  }
};

export default Image;
