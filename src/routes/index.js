import express from 'express';
import { getBoredRoutes } from './bored';
import { getInteractiveRoutes } from './interactive';
import { getQuotesRoutes } from './quotes';

function getRoutes() {
  const router = express.Router();

  router.use('/bored', getBoredRoutes());
  router.use('/quotes', getQuotesRoutes());
  router.use('/interactive', getInteractiveRoutes());

  return router;
}

export { getRoutes };
