import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { ItemGallery, ItemImg } from './ImageGalleryItem.styled';
import { useState } from 'react';

export default function ImageGalleryItem({ url, tag, largeImageUrl }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <ItemGallery>
        <ItemImg src={url} alt={tag} onClick={toggleModal} />
      </ItemGallery>

      {showModal && (
        <Modal
          largeImageUrl={largeImageUrl}
          toggleModal={toggleModal}
          tag={tag}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
