import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelizeCon } from './src/init/dbConnection.js'; 

dotenv.config();

// Database connection and sync
sequelizeCon.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database', err);
  });

const app = express();
const port = process.env.PORT || 3085;

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello, developer. You've reached the API. It's been waiting.",
    status: "online-ish",
    warnings: [
      "Payment Bacha hai abhi"
    ],
    tip: "Payment pura kardo jaldi"
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
