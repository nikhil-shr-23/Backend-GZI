import app from './src/app.js';
import { appConfig } from './src/config/env.js';

const PORT = appConfig.port;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world! Server listening on port', PORT);
});

export default app;


