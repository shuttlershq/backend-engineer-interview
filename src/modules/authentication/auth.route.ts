import express from 'express';
import { signup, signin } from './auth.controller';
import validateBody from '../../middleware/validate';

const router = express.Router();

router.route('/signup').post(validateBody('authSchema', 'signup'), signup);
router.route('/signin').post(validateBody('authSchema', 'signin'), signin);

export = router;
