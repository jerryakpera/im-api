import express, { Request, Response } from 'express';

import { authRouter } from '@/api/auth/auth.router';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';

const apiRouter = express.Router();

apiRouter.use('/api/auth', authRouter);
apiRouter.use('/health-check', healthCheckRouter);
apiRouter.get('/', (req: Request, res: Response) => {
  res.send('Home');
});

export default apiRouter;
