import PropTypes from 'prop-types';

const LoadMore = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};
export default LoadMore;
LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
