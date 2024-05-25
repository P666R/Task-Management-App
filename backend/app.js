import express from 'express';
import morgan from 'morgan';

import { morganMiddleware } from './utils/logger.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

export default app;
