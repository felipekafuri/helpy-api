import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '../typeorm/index';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '../../errors/AppError';

import routes from './routes/index';
import '@shared/container';

const app = express();
app.use(
  cors({
    origin: [
      String(process.env.APP_WEB_URL),
      String(process.env.APP_WEB_DASHBOARD_URL),
    ],
  })
);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
