import { Router } from 'express';
import { uploadDocument, getDocuments, getDocumentById } from '../controllers/document.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);

export default router;
