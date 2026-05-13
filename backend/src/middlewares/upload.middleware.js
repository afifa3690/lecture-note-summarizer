import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads/';

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'application/msword', // doc
    'application/vnd.ms-powerpoint', // ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
    'text/plain'
  ];

  if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith('text/')) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.originalname}`));
  }
};

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});
