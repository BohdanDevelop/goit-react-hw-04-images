import style from './ImageGallery.module.scss';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className={style['ImageGallery']}>{children}</ul>;
};
export default ImageGallery;
