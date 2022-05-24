import express from 'express';
import { postQuotes } from '../controllers/quotes';

export function getQuotesRoutes() {
  const router = express.Router();

  router.post('/', postQuotes);

  return router;
}
