import style from './ImageGallery.module.scss';

const ImageGallery = ({ children }) => {
  return <ul className={style['ImageGallery']}>{children}</ul>;
};
export default ImageGallery;
