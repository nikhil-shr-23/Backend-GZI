import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { loadEnvironment, appConfig, corsOptions } from './config/env.js';
import requestLogger from './middleware/requestLogger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

// Load environment variables early
loadEnvironment();

const app = express();

// Core middleware
app.use(express.json());
app.use(cors(corsOptions));

// Logging
if (appConfig.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Health root for convenience
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: appConfig.serviceName, env: appConfig.nodeEnv });
});

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

export default app;


