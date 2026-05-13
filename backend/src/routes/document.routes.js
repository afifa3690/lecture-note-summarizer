import { Router } from 'express';
import { uploadDocument, getDocuments, getDocumentById, chatWithDocument } from '../controllers/document.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      // Handle multer and file validation errors
      let errorMessage = err.message;
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = 'File too large. Maximum size allowed is 10MB.';
      }
      return res.status(400).json({ success: false, error: errorMessage });
    }
    next();
  });
}, uploadDocument);

router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.post('/:id/chat', chatWithDocument);

export default router;
