import style from './ImageGalleryItem.module.scss';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, openModal }) => {
  const imageMarkup = images.map(
    ({ webformatURL, tags, id, largeImageURL }) => {
      return (
        <li
          className={style['ImageGalleryItem']}
          key={nanoid()}
          onClick={() => openModal(largeImageURL, tags)}
        >
          <img
            className={style['ImageGalleryItem-image']}
            width="300"
            height="300"
            src={webformatURL}
            alt={tags}
          />
        </li>
      );
    }
  );
  return imageMarkup;
};
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
