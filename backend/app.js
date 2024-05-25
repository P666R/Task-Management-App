import express from 'express';
import morgan from 'morgan';

import { morganMiddleware } from './utils/logger.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
