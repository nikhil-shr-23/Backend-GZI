import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world! Server listening on port', PORT);
});

export default app;


