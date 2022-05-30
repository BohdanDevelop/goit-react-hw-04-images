import { useState, useEffect, useRef, useCallback } from 'react';
import Searchbar from './components/Searchbar';
import searchQuery from '../shared/searchQuery';
import LoadMore from './components/LoadMore';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Modal from './components/Modal';

import ClipLoader from 'react-spinners/ClipLoader';

const SearchingImages = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: '', alt: '' });
  const isFirstRender = useRef(true);
  const isImageArray = useRef(false);

  const onSubmit = searchArg => {
    if (searchArg && searchArg !== search) {
      setImages([]);
      setSearch(searchArg.trim());
    }
  };
  const onLoadMore = () => {
    const totalPages = Math.ceil(total / 12);
    if (totalPages > 1 && page < totalPages) {
      setPage(page + 1);
    }
  };
  const openModal = (itemImage, alt) => {
    setIsModalOpen(true);
    setModalImage({ src: itemImage, alt });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage({});
  };
  const renderContent = (statusArg, imagesArg) => {
    if (statusArg === 'loading' && !imagesArg.length) {
      return (
        <div className="sweet-loading">
          <ClipLoader loading={true} color={'#000000'} size={50} />
        </div>
      );
    }
    if (statusArg === 'idle') {
      return <p>Pass the search</p>;
    }
    if (statusArg === 'successfully loaded' && imagesArg.length) {
      return (
        <>
          <ImageGallery>
            <ImageGalleryItem openModal={openModal} images={imagesArg} />
          </ImageGallery>
          <LoadMore onLoadMore={onLoadMore} />
        </>
      );
    }
    if (statusArg === 'error') {
      return <p>{error}</p>;
    }
    if (statusArg === 'no images') {
      return <p>No images found</p>;
    }
  };
  const fetchResult = useCallback(async () => {
    const { hits, totalHits } = await searchQuery(search, page);
    return { hits, totalHits };
  }, [search, page]);

  useEffect(() => {
    if (!isFirstRender.current && search) {
      if (!isImageArray.current) {
        setStatus('loading');
      }
      fetchResult()
        .then(({ hits, totalHits }) => {
          if (!totalHits) setStatus('no images');
          setImages(prevState => {
            return [...prevState, ...hits];
          });
          setTotal(totalHits);
          setStatus(() => (totalHits ? 'successfully loaded' : 'no images'));
        })
        .catch(error => {
          setStatus('error');
          setError(error.message);
        });
    } else {
      isFirstRender.current = false;
      setStatus('idle');
    }
  }, [fetchResult, search]);
  useEffect(() => {
    isImageArray.current = Boolean(images.length);
  }, [images]);
  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {renderContent(status, images)}
      {isModalOpen && (
        <Modal
          image={modalImage.src}
          alt={modalImage.alt}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default SearchingImages;
