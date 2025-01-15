import dotenv from 'dotenv';
import express from 'express';
import router from './api/routes';

const PORT = 3000;

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));