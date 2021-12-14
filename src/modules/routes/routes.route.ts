import express from 'express';
import {
  createRoute,
  connectToRoute,
  setCurrentLocation,
} from './routes.controller';
import validateBody from '../../middleware/validate';
import authMiddleware from '../../middleware/authmiddleware';

const router = express.Router();

router
  .route('/create-route')
  .post(
    authMiddleware,
    validateBody('routeSchema', 'createRoute'),
    createRoute,
  );

router
  .route('/connect-route')
  .post(
    authMiddleware,
    validateBody('routeSchema', 'connectToRoute'),
    connectToRoute,
  );

router
  .route('/emit-location')
  .post(validateBody('routeSchema', 'emitLocation'), setCurrentLocation);

export = router;
