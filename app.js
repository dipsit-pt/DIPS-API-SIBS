// Imports --------------------------------------------
import express from 'express';
import morgan from 'morgan';
import mainRouter from './api/routes/routes.js';
import { config } from 'dotenv';
import { globalErrorHandler } from './api/controllers/error.js';
import { AppError } from './api/utils/appError.js';
import { log, updateSummaryFile } from '@dips/api-log';

// Express
const app = express();

// Load Environment
config();

// Express JSON
app.use(express.json());

// Webhook Text SIBS
app.use(express.text({ type: 'text/plain' }));

// Url encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware morgan
if (process.env.NODE_ENV === 'development') {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') console.log(`Environment: ${process.env.NODE_ENV}`);

// Routers --------------------------------------------
// Mount Router

app.use('/', mainRouter);

app.all('*', (req, res, next) => {
  log(`Can not find ${req.originalUrl} on this server!`, 'error');
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
