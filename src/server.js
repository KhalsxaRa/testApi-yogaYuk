import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';  
import routerPengguna from './modul/router.pengguna.js';
import logger from '../src/config/middleware.config/middleware.js';
import { xss } from 'express-xss-sanitizer';


// import { Pool } from 'pg';


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }),
);
app.use(logger);
app.use(xss());
app.use(helmet());

dotenv.config();
app.get('/', (req, res) => {
  res.send('Hello test!');
});

// Menggunakan Router untuk path menu CRUD pengguna

app.use('/api/pengguna', routerPengguna);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
