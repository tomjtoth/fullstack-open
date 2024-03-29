const express = require('express');
const app = express();

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.use(express.json());

app.get('/info', (_req, resp) => {
    resp.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <br />
        <p>${new Date().toString()}</p>
    `);
});

app.get('/api/persons', (_req, resp) => {
    resp.json(persons);
});

app.get('/api/persons/:id', (req, resp) => {

    const wanted_id = Number(req.params.id);

    const pp = persons.find(({ id }) => id === wanted_id);

    if (pp)
        return resp.json(pp);

    resp
        .status(404)
        .send({
            error: `id "${wanted_id}" does not exist`
        });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});