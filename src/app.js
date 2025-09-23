import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { loadEnvironment, appConfig, corsOptions } from './config/env.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import requestLogger from './middleware/requestLogger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

// Load environment variables early
loadEnvironment();

const app = express();

// Core middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

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


