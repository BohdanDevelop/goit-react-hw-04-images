import { Component } from 'react';
import style from './Searchbar.module.scss';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    search: '',
  };
  reset = () => {
    this.setState({ search: '' });
  };
  changeValue = evt => {
    const { value } = evt.currentTarget;
    this.setState({ search: value });
  };
  submitForm = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.search);
    this.reset();
  };
  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.submitForm}>
          <button type="submit" className={style['SearchForm-button']}>
            <span className={style['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={style['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.changeValue}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
