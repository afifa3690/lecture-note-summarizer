import { Router } from 'express';
import { uploadDocument, getDocuments, getDocumentById, chatWithDocument } from '../controllers/document.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Protect all document routes with verifyToken middleware
router.use(verifyToken);

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
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
