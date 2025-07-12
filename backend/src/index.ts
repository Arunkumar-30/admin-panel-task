import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes';
import { sequelize } from './models';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', UserRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
});
