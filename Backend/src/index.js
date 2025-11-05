import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';

// Load environment variables

dotenv.config();

const port = process.env.PORT;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// simple root route to confirm server is up
app.get('/', (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});
