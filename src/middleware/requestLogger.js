export default function requestLogger(req, res, next) {
  const startTimeMs = Date.now();
  res.on('finish', () => {
    const elapsedMs = Date.now() - startTimeMs;
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${elapsedMs}ms`);
  });
  next();
}


