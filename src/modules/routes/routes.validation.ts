import Joi from 'joi';

export const createRoute = Joi.object({
  startLong: Joi.string().required(),
  startLat: Joi.string().required(),
  stopLong: Joi.string().required(),
  stopLat: Joi.string().required(),
  assetId: Joi.string().required(),
});

export const connectToRoute = Joi.object({
  long: Joi.string().required(),
  lat: Joi.string().required(),
  routeId: Joi.string().required(),
});

export const emitLocation = Joi.object({
  long: Joi.string().required(),
  lat: Joi.string().required(),
  assetId: Joi.string().required(),
});
