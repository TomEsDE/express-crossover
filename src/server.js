import express from 'express';
import http from 'http';
import { routes } from './routes/quiz.js';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
// const port = process.env.PORT;

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({});
  }
  next();
});

/** Routes */
app.use('/', routes);

/** images & co */
app.use(express.static('public'));

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

console.log(process.env.DB_CONFIG);

/** Server */
const httpServer = http.createServer(app);
const PORT = process.env.PORT ?? 3033;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
