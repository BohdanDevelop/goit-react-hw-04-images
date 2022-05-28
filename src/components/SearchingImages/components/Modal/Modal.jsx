import { createPortal } from 'react-dom';
import style from './Modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
const Modal = ({ image, alt, closeModal }) => {
  return createPortal(
    <div className={style.Overlay}>
      <div className={style.Modal}>
        <button className={style.button} type="button" onClick={closeModal}>
          X
        </button>
        <img src={image} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
