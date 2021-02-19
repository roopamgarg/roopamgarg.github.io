import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
const LazyImage = ({ src,alt }) => (
  <LazyLoadImage
    alt={alt}
    effect="blur"
    src={src} />
);

export default LazyImage;