require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

app.get('/info', (_req, resp, next) =>
  Person.find({})
    .then((peeps) =>
      resp.send(`
            <p>Phonebook has info for ${peeps.length} people</p>
            <p>${new Date().toString()}</p>
        `)
    )
    .catch((err) => next(err))
);

app.post('/api/persons', (req, resp, next) => {
  const { name, number } = req.body;

  if (!number) return next(new Error('missing number'));

  if (!name) return next(new Error('missing name'));

  new Person({ name, number })
    .save()
    .then((x) => resp.status(201).json(x))
    .catch((err) => next(err));
});

app.get('/api/persons', (_req, resp, next) =>
  Person.find({})
    .then((people) => resp.json(people))
    .catch((err) => next(err))
);

app.get('/api/persons/:id', (req, resp, next) =>
  Person.findById(req.params.id)
    .then((pp) => resp.json(pp))
    .catch((err) => next(err))
);

app.put('/api/persons/:id', (req, resp, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((pp) => resp.json(pp))
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, resp, next) =>
  Person.findByIdAndDelete(req.params.id)
    .then(() => resp.status(204).end())
    .catch((err) => next(err))
);

app.use((err, _req, resp, next) => {
  const { message, name } = err;

  if (name === 'CastError')
    return resp.status(400).json({ error: 'malformatted id' });

  if (message.match(/^missing (?:name|number)$/))
    return resp.status(400).json(message);

  if (name === 'ValidationError')
    return resp.status(400).json({ error: message });

  next(err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
