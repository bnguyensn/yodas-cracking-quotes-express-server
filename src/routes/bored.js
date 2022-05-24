import express from 'express';
import { postBored } from '../controllers/bored';

export function getBoredRoutes() {
  const router = express.Router();

  router.post('/', postBored);

  return router;
}

