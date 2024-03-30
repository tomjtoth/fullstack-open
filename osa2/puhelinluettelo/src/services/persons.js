import axios from "axios"

// using relative path, because in production I'm using nginx as a reverse proxy and this is not running on '/'
const BASE_URL = 'api/persons';

const getAll = () => axios
    .get(BASE_URL)
    .then(({ data }) => data);

const createNew = (person) => axios
    .post(BASE_URL, person)
    .then(({ data }) => data);

const deleteExisting = (id) => axios
    .delete(BASE_URL + '/' + id)
    .then(({ data }) => data);

const updateExisting = (obj) => axios
    .put(BASE_URL + '/' + obj.id, obj)
    .then(({ data }) => data);

export default { getAll, createNew, deleteExisting, updateExisting }
