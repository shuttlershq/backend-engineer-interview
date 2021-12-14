import express from 'express';
import authRoute from '../modules/authentication/auth.route';
import routesRoute from '../modules/routes/routes.route';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (req, res, next) => {
  res.send('Antantica is freezing. ..🥶 ...');
});
router.use('/auth', authRoute);
router.use('/routes', routesRoute);

export default router;
