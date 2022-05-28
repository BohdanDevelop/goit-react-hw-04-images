import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '27157182-78441902fcb5ec82df186427b',
    per_page: 12,
  },
});

async function searchQuery(q, page) {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  
  return {
    hits: data.hits,
    total: data.totalHits,
  };
}
export default searchQuery;
