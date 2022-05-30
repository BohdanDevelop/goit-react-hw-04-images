import { useState } from 'react';
import style from './Searchbar.module.scss';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const reset = () => {
    setSearch('');
  };
  const changeValue = evt => {
    const { value } = evt.currentTarget;
    setSearch(value);
  };
  const submitForm = evt => {
    evt.preventDefault();
    onSubmit(search);

    reset();
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={submitForm}>
        <button type="submit" className={style['SearchForm-button']}>
          <span className={style['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={style['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={changeValue}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
