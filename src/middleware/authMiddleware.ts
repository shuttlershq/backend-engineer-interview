import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getConnection } from 'typeorm';
import { User } from '../modules/authentication/entities/auth.entity';

dotenv.config();
interface JwtPayload {
  id: string;
  type: string;
}

const auth = async (req, res, next) => {
  const userRepository = getConnection().getRepository(User);
  const token = req.header('Authorization');
  try {
    if (!token || typeof token !== 'string') throw Error('');
    const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload;
    const { id, type } = decoded;
    const user = await userRepository.findOne({ id });
    if (!user) throw Error('');
    res.locals.user = user;
    res.locals.authType = type;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res
      .status(401)
      .json({ success: false, message: 'Unable to authenticate token' });
  }
  return next();
};

export default auth;
