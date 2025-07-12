import express from 'express';
import { register, login, getUsers, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/userMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, getUsers);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
