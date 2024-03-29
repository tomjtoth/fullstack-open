import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = () => axios
    .get(BASE_URL + 'all')
    .then(({ data }) => data);

export default { getAll }
