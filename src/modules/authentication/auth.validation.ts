import Joi from 'joi';

export const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
