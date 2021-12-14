import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './entities/auth.entity';
import { getConnection } from 'typeorm';
import { Signup, SignupModel, UserModel } from './types/user.types';
import HttpError from '../../exceptions/http-error';
import { Vars } from '../../config/vars';

export const signup = async (payload: Signup): Promise<SignupModel> => {
  const userRepository = getConnection().getRepository(User);
  const { email, password } = payload;
  const existingUser = await userRepository.findOne({ email });
  if (existingUser) {
    throw new HttpError(400, `Email ${email} already in use.`);
  }
  const user = userRepository.create();
  user.email = email;
  user.password = await hashPassword(password);
  await user.save();
  delete user.password;
  return user;
};

export const signin = async (payload: Signup): Promise<UserModel> => {
  const userRepository = getConnection().getRepository(User);
  const { email, password } = payload;
  const user = await userRepository
    .createQueryBuilder('users')
    .addSelect('users.password')
    .where({
      email: email,
    })
    .getOne();
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new HttpError(400, 'Incorrect email or password');
  }
  const token = await genToken(user.id, 'auth');
  return {
    ...formatUser(user),
    token,
  };
};

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const genToken = async (id: string, type: string) =>
  jwt.sign({ id, type }, Vars.secret, {
    expiresIn: '365d',
  });

const formatUser = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
