import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/sokect.js';
import path from 'path';

// Load environment variables

dotenv.config();

const port = process.env.PORT;
const __dirname = path.resolve();

// middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // React app URL
    credentials: true, // allow cookies/sessions if used
  })
);

// simple root route to confirm server is up
app.get('/', (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
  console.log(`Current dirname: ${__dirname}`);
  const distPath = path.join(__dirname, '../Frontend/dist');
  console.log(`Current distPath: ${distPath}`);
  app.use(express.static(distPath));

  const indexPath = path.join(distPath, 'index.html');
  console.log(`Current indexPath: ${indexPath}`);
  app.get('/{*any}', (req, res) => {
    res.sendFile(indexPath);
  });
}

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});
