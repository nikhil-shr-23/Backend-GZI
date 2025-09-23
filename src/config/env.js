import dotenv from 'dotenv';

export function loadEnvironment() {
  const result = dotenv.config();
  if (result.error && process.env.NODE_ENV !== 'production') {
    // In production, env should be provided by the runtime. Don't throw in dev, just warn.
    // eslint-disable-next-line no-console
    console.warn('Warning: .env file not found; relying on process environment');
  }
}

export const appConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'gzi-backend',
};

export const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
};

export const databaseConfig = {
  postgresUrl: process.env.DATABASE_URL,
  mongoUri: process.env.MONGODB_URI,
};

export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me',
  accessTokenTtl: process.env.JWT_ACCESS_TTL || '15m',
  refreshTokenTtl: process.env.JWT_REFRESH_TTL || '7d',
};


