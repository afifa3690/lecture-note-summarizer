import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// 1. Initialize environment variables BEFORE anything else
dotenv.config();

// 2. Validate critical environment configuration
if (!process.env.GEMINI_API_KEY) {
  console.warn("\n========================================");
  console.warn("WARNING: GEMINI_API_KEY is missing in .env configuration.");
  console.warn("The server will start, but AI generation will fail with an error.");
  console.warn("Please add your key to backend/.env");
  console.warn("========================================\n");
} else {
  console.log("[System] Environment variables loaded successfully.");
  console.log("[System] GEMINI_API_KEY detected.");
}

// 3. Import services and routes after environment is secure
import { PrismaClient } from '@prisma/client';
import documentRoutes from './src/routes/document.routes.js';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: function(origin, callback) {
    // Allow all origins to bypass localhost vs 127.0.0.1 mismatch issues
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/documents', documentRoutes);

app.get('/health', async (req, res) => {
  try {
    // Simple DB check
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', message: 'Lecture Note Summarizer API running', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[System] Server running at http://localhost:${port}`);
});
