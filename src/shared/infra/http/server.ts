import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Erro interno do servidor.' });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('⬛ Server listening at port 3333 ⬛');
});
