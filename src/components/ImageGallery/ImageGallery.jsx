import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { useState, useEffect } from 'react';

export default function ImageGallery({ images }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageNumber(1);
    setIsLoading(false);
  }, [images, pageNumber]);

  return (
    <>
      <Gallery className="gallery">
        {images &&
          images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                tag={image.tags}
                url={image.webformatURL}
                largeImageUrl={image.largeImageURL}
              />
            );
          })}
      </Gallery>
      {isLoading && <Loader />}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
};
