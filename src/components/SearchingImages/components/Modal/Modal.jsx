import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import style from './Modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
const Modal = ({ image, alt, closeModal }) => {
  useEffect(() => {
    const escModal = evt => {
      if (evt.code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', escModal);
    return () => {
      document.removeEventListener('keydown', escModal);
      console.log('removed');
    };
  }, [closeModal]);
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
