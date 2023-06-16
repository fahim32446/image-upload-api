import cors from 'cors';
import { dirname } from 'esm-dirname';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { db } from './db/db.js';
import { currentPath } from './utils/image_upload.js';

import vector_image_route from './routes/vector_image_route.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  })
);

//connect database
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
});

export const homeDir = dirname(import.meta);
app.use('/uploads', express.static(path.join(homeDir, '/uploads')));
app.use(morgan('dev'));

// route
app.use('/v1/api/vector', vector_image_route);

// Init Route
app.get('/', async (req, res) => {
  res.send('HII');
});
