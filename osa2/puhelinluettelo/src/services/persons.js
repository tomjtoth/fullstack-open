import axios from "axios"

const BASE_URL = 'http://localhost:3001/persons';

const getAll = () => axios
    .get(BASE_URL)
    .then(({ data }) => data);

const createNew = (person) => axios
    .post(BASE_URL, person)
    .then(({ data }) => data);

export default { getAll, createNew }
