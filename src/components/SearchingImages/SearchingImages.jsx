import { Component } from 'react';
import Searchbar from './components/Searchbar';
import searchQuery from '../shared/searchQuery';
import LoadMore from './components/LoadMore';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Modal from './components/Modal';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

class SearchingImages extends Component {
  state = {
    search: '',
    status: 'idle',
    error: null,
    images: [],
    total: 0,
    page: 1,
    isModalOpen: false,
    modalImage: {
      src: '',
      alt: '',
    },
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      if (this.state.status !== 'successfully loaded') {
        this.setState({ status: 'loading' });
      }

      try {
        const { hits, total } = await searchQuery(
          this.state.search,
          this.state.page
        );

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits],
            status: total ? 'successfully loaded' : 'no images',
            total,
          };
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }
  onSubmit = search => {
    this.setState({
      images: [],
      search: search.trim(),
    });
  };
  onLoadMore = () => {
    const totalPages = Math.ceil(this.state.total / 12);
    const { page } = this.state;

    if (totalPages > 1 && page < totalPages) {
      this.setState(prevState => {
        return { page: prevState.page + 1 };
      });
    }
  };
  openModal = (itemImage, alt) => {
    this.setState({
      isModalOpen: true,
      modalImage: {
        src: itemImage,
        alt,
      },
    });
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false,
      modalImage: '',
    });
  };
  renderContent(status, images) {
    if (status === 'loading' && !images.length) {
      return (
        <div className="sweet-loading">
          <ClipLoader loading={true} color={'#000000'} size={50} />
        </div>
      );
    }
    if (status === 'idle') {
      return <p>Pass the search</p>;
    }
    if (status === 'successfully loaded' && images.length) {
      return (
        <>
          <ImageGallery>
            <ImageGalleryItem
              openModal={this.openModal}
              images={this.state.images}
            />
          </ImageGallery>
          <LoadMore onLoadMore={this.onLoadMore} />
        </>
      );
    }
    if (status === 'no images') {
      return <p>No images found</p>;
    }
  }
  render() {
    const {
      status,
      images,
      isModalOpen,
      modalImage: { src, alt },
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.renderContent(status, images)}
        {isModalOpen && (
          <Modal image={src} alt={alt} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
export default SearchingImages;
