import dotenv from 'dotenv';
dotenv.config(); // <-- Sabse pehle initialize hona zaroori hai

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import oralRootsRoutes from './routes/oralRootsRoutes.js';
import chronicleRoutes from './routes/chronicleRoutes.js';
import characterRoutes from './routes/characterRoutes.js';


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/oral-roots', oralRootsRoutes);
app.use('/api/chronicles', chronicleRoutes);
app.use('/api/characters', characterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));