import fs from 'fs';
import path from 'path';
import { db } from '../db/db.js';
import { homeDir } from '../index.js';
import { Response } from '../utils/response.js';

//POST
export const vector_post = async (req, res, next) => {
  const { title } = req.body;
  const covers = req.files;

  for (let i = 0; i < covers.length; i++) {
    const cover = covers[i];

    let path = cover.destination;
    if (path.startsWith('./')) {
      path = path.substring(2);
    }
    path = '/' + path;

    const imageInfo = {
      title,
      imgPath: path,
      image: cover.filename,
    };

    const query = 'INSERT INTO vectorwall SET ?';

    try {
      await new Promise((resolve, reject) => {
        db.query(query, imageInfo, (err, data) => {
          if (err) {
            console.log(err);
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
};

//Get

export const vector_get = async (req, res, next) => {
  const query = 'SELECT id, title, imgPath, image FROM vectorwall';
  const serverAddress = req.hostname;
  const queryParams = [serverAddress + ':8000'];

  db.query(query, queryParams, (err, data) => {
    if (err) {
      const response = Response(false, err, 400);
      return res.status(400).json(response);
    }
    const response = Response(true, { data, queryParams }, 200);
    return res.status(200).json(response);
  });
};

// Delete

export const vector_delete = async (req, res, next) => {
  const bookId = req.params.id;
  const query = 'SELECT imgPath, image FROM vectorwall WHERE id = ?';

  db.query(query, [bookId], async (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    if (result.length === 0) {
      return res.json('Book not found');
    }

    const coverPath = result[0].image;
    let dir = result[0].imgPath;
    const absolutePath = path.join(homeDir, dir, coverPath);
    console.log({ absolutePath, coverPath, dir });

    async function deleteFileIfExists() {
      try {
        await fs.promises.access(absolutePath, fs.constants.F_OK);
        await fs.promises.unlink(absolutePath);
      } catch (err) {}
    }

    deleteFileIfExists();

    const deleteQuery = 'DELETE FROM vectorwall WHERE id = ?';
    let deletionCounter = 0;

    db.query(deleteQuery, [bookId], (deleteErr, data) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.json(deleteErr);
      }
      deletionCounter++;

      if (deletionCounter === 1) {
        return res.json('Image have been deleted successfully');
      }
    });
  });
};
