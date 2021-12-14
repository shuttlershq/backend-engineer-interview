import * as routesService from './routes.service';
import call from '../../utils/call';

export const createRoute = call(async (req, res) => {
  const track = await routesService.createRoute(req.body);
  res.status(201).json({ data: track });
});

export const connectToRoute = call(async (req, res) => {
  const { user } = res.locals;
  const track = await routesService.connectToRoute({
    ...req.body,
    userId: user.id,
  });
  res.status(201).json({ data: track });
});

export const setCurrentLocation = call(async (req, res) => {
  const { io } = req.app.locals;
  const track = await routesService.setCurrentLocation(io, req.body);
  res.status(200).json({ data: track });
});
