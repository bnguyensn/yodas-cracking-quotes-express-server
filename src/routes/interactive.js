import express from 'express';
import { postInteractive } from '../controllers/interactive';

export function getInteractiveRoutes() {
  const router = express.Router();

  router.post('/', postInteractive);

  return router;
}
