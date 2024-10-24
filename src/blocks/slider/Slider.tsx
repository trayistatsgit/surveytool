import React, { useState } from 'react';
import './Slider.scss';

type ImageSliderProps = {
  images: { src: string; heading: string; text: string }[];
  autoPlay?: boolean;
  interval?: number;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlay = false, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(nextImage, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, images.length]);

  return (
    <div className='image-slider-signup'>
      <img src={images[currentIndex].src} alt={`Slide ${currentIndex}`} className='slider-image-signup' />
      <div className='slide-content-signup'>
        <h2>{images[currentIndex].heading}</h2>
        <p>{images[currentIndex].text}</p>
      </div>
      <div className='dots-signup'>
        {images.map((_, index) => (
          <span key={index} className={`dot-signup ${index === currentIndex ? 'active-signup' : ''}`} onClick={() => goToImage(index)}></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
