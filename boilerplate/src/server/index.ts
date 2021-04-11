import chalk from 'chalk';
import next from 'next';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error';
import getRoutes from './api/routes';
import { log } from '../shared/common/utils';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const isDev = process.env.PHASE === 'dev'; // TODO: Change isDev to phase
console.log('[app-nextjs] isDev :', isDev);
console.log('[app-nextjs] PHASE :', process.env.PHASE);

async function init(): Promise<void> {
  // Ref: https://nextjs.org/docs/advanced-features/custom-server
  const nextApp = next({
    dev: isDev,
    quiet: isDev,
  });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const PORT: number = parseInt(process.env.PORT, 10) || 9001;

  const app = express();

  // TODO: Connect DB

  app.use(morgan('dev'));
  // app.use(helmet()); // TODO:
  app.use(bodyParser.json());

  const customMiddleware = (err, req, res, next) => {
    console.log('custom');
    next();
  };
  app.use(customMiddleware);

  app.use('/api', getRoutes());
  app.use(errorHandler); // TODO: Check middleware line position

  // FIXME: Use webpack to build server/index.ts typescript file, and run.
  // Ref: https://webpack.js.org/guides/typescript/
  app.get('*', (req, res) => {
    handle(req, res);
  });

  // app.post('/login', async (req: Request, res: Response) => {
  //   res.status(200).json({ accessToken, refreshToken });
  // });

  const server = app.listen(PORT, () => {
    log(chalk.bgGreen(`🚀 Listening on port: ${PORT}`));
  });
}

try {
  init();
} catch (err) {
  console.error('Failed to start server :', err);
}
