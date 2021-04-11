import { Router } from 'express';
import AwardsRoutes from './awards';

export default function getRoutes() {
  const router = Router();

  // TODO: Arrange
  router.use('/awards', AwardsRoutes());

  return router;
}
