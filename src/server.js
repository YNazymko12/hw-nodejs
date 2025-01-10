import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './middlewares/logger.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(logger);

  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'My contacts',
  //   });
  // });
  app.use('/auth', authRouter);
  app.use(contactsRouter);
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
