import * as authService from './auth.service';
import call from '../../utils/call';

export const signup = call(async (req, res) => {
  const auth = await authService.signup(req.body);
  res.status(201).json({ data: auth });
});

export const signin = call(async (req, res) => {
  const user = await authService.signin(req.body);
  res.status(200).json({ data: user });
});
