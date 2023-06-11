import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

import { BoxDiv } from './App.styled';
import { fetchImages } from 'services/imageApi';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { hits, totalHits } = await fetchImages(pageNumber, searchValue);
        if (hits.length === 0) {
          toast.error("Sorry, images not found... But you can try: 'Apple'");
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(pageNumber < Math.ceil(totalHits / 12));
        if (totalHits <= 12) {
          toast("Oh, but that's all?! But you can try: 'Car'");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue !== '') {
      fetchGallery();
    }
  }, [searchValue, pageNumber]);

  const onLoadMore = () => {
    setIsLoading(true);
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const onSearchSubmit = searchValue => {
    setIsLoading(true);
    setSearchValue(searchValue);
    setImages([]);
    setPageNumber(1);
    setLoadMore(false);
  };

  return (
    <BoxDiv>
      <Searchbar onSubmit={onSearchSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && <Loader />}
      {loadMore && <Button onClick={onLoadMore} />}

      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </BoxDiv>
  );
}
