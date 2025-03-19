import express from 'express';
import { googleAuth, register } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/google-auth', googleAuth);

export default router;