import express from 'express';
import {
  vector_post,
  vector_delete,
  vector_get,
} from '../controllers/vector_image_con.js';
import { upload } from '../utils/image_upload.js';

const router = express.Router();

router.post('/', upload.array('covers'), vector_post);
router.get('/', vector_get);
router.delete('/:id', vector_delete);

export default router;
