import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import documentRoutes from './src/routes/document.routes.js';
import path from 'path';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
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
  console.log(`Server running at http://localhost:${port}`);
});
