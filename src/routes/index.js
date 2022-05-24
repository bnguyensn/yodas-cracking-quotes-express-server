import express from 'express';
import { getInteractiveRoutes } from './interactive';
import { getQuotesRoutes } from './quotes';

function getRoutes() {
  const router = express.Router();

  router.use('/quotes', getQuotesRoutes());
  router.use('/interactive', getInteractiveRoutes());

  return router;
}

export { getRoutes };
