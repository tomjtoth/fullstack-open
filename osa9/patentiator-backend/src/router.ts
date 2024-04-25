import express from 'express';

import diagSvc from './services/diagnoses';
import patiSvc from './services/patients';
import { toNewPatient } from './utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

router.get('/diagnoses', (_req, res) => {
  res.json(diagSvc.getAll());
});

router.get('/patients', (_req, res) => {
  res.json(patiSvc.getAllNS());
});

router.get('/patients/:id', (req, res) => {
  const foundPatient = patiSvc.getById(req.params.id);
  if (foundPatient) return res.json(foundPatient);

  return res.status(404).json({ error: 'patient not found' });
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patiSvc.addNew(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
