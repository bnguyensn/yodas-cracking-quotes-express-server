import express from 'express';
import { getQuotesRoutes } from './quotes';

function getRoutes() {
  const router = express.Router();

  router.use('/quotes', getQuotesRoutes());

  return router;
}

export { getRoutes };
