import express from 'express';

import diagSvc from './services/diagnoses';
import patiSvc from './services/patients';

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

export default router;
