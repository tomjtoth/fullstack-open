const log = require('./logger');

const requestLogger = (req, _resp, next) => {
    log.info('Method:', req.method);
    log.info('Path:  ', req.path);
    log.info('Body:  ', req.body);
    log.info('---');
    next();
};

const unknownEndpoint = (_req, resp) =>
    resp.status(404).send({ error: 'unknown endpoint' });


const errorHandler = (error, _req, resp, next) => {
    log.error(error.message);

    if (error.name === 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return resp.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
