console.log('siva')

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/config.js'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define Routes
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
