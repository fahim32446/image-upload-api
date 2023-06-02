import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import morgan from 'morgan';
import { dirname } from 'esm-dirname';

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  })
);

const currentPath = dirname(import.meta);
app.use('/uploads', express.static(path.join(currentPath, '/uploads')));
app.use(morgan('dev'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Terminate the application process to prevent further execution
  }
  console.log('Connected to the database');

  // Start the server after successful database connection
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
});

// Multer configuration for file upload

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${crypto
      .randomBytes(8)
      .toString('hex')}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

app.post('/books', upload.array('covers'), async (req, res) => {
  const { title, desc, price } = req.body;
  const covers = req.files;

  for (let i = 0; i < covers.length; i++) {
    const cover = covers[i];

    let path = cover.destination;
    if (path.startsWith('./')) {
      path = path.substring(2);
    }
    path = '/' + path;

    const bookInfo = {
      title,
      desc,
      price,
      imgPath: path,
      cover: cover.filename,
    };

    const query = 'INSERT INTO books SET ?';

    try {
      await new Promise((resolve, reject) => {
        db.query(query, bookInfo, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      res.write(`Photo ${i + 1} inserted successfully.\n`);
    } catch (error) {
      return res.json(error);
    }
  }

  res.end('All photos inserted successfully.');
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'SELECT cover, imgPath FROM books WHERE id = ?';

  db.query(query, [bookId], async (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    if (result.length === 0) {
      return res.json('Book not found');
    }

    const coverPath = result[0].cover;

    let dir = result[0].imgPath;
    const currentDir = dirname(import.meta);

    const absolutePath = path.join(currentDir, dir, coverPath);

    if (coverPath) {
      await fs.unlink(absolutePath, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        // File deletion successful
      });
    }

    const deleteQuery = 'DELETE FROM books WHERE id = ?';

    let deletionCounter = 0;

    db.query(deleteQuery, [bookId], (deleteErr, data) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.json(deleteErr);
      }
      deletionCounter++;

      if (deletionCounter === 1) {
        return res.json('Book and image have been deleted successfully');
      }
    });
  });
});

// insert new user with photo upload
app.post('/signup', upload.single('photo'), (req, res) => {
  const { name, email, password } = req.body;
  const photo = req.file;

  // check if all required fields are present
  if (!name || !email || !password || !photo) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // read the uploaded file
  const data = fs.readFileSync(photo.path);

  // create user object
  const user = {
    name,
    email,
    password,
    photo: `/uploads/${photo.filename}`,
  };

  // insert new user into mysql database
  const query = 'INSERT INTO users SET ?';
  db.query(query, user, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: 'User inserted successfully' });
  });
});

const coverStorage = multer.diskStorage({
  destination: './coverImg',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const coverUpload = multer({ storage: coverStorage });

app.get('/books', (req, res) => {
  const query = 'SELECT id, title, `desc`, price, cover, imgPath FROM books';
  const serverAddress = req.hostname;
  const queryParams = [serverAddress + ':8000'];

  db.query(query, queryParams, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data, queryParams });
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query = `SELECT * FROM books WHERE id= ?`;

  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query =
    'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(query, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book Has Been Updated');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Handle specific types of errors
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: 'File upload error', error: err.message });
  }

  // Handle other types of errors
  return res.status(500).json({ message: 'Internal server error' });
});

app.get('/', async (req, res) => {
  res.send('HII');
});
