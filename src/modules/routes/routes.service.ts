import { Point } from 'geojson';
import { Routes } from './entities/routes.entity';
import { Pickups } from './entities/pickups.entity';
import { getConnection } from 'typeorm';
import { Location } from './types/routes.types';
// import HttpError from '../../exceptions/http-error';

export const createRoute = async (payload: Location) => {
  const trackRepository = getConnection().getRepository(Routes);
  const { startLong, startLat, stopLong, stopLat, assetId } = payload;
  const distance: number = await calcCrowDistance(
    startLat,
    startLong,
    stopLat,
    stopLong,
  );
  console.log(Math.round(distance));
  const track = trackRepository.create();
  const start: Point = {
    type: 'Point',
    coordinates: [+startLong, +startLat],
  };
  const stop: Point = {
    type: 'Point',
    coordinates: [+stopLong, +stopLat],
  };

  track.start = start;
  track.stop = stop;
  track.assetId = assetId;
  track.distance = Math.round(distance);
  return await track.save();
};

export const connectToRoute = async (payload) => {
  const { userId, routeId, lat, long } = payload;
  const pickupRepository = getConnection().getRepository(Pickups);
  const location: Point = {
    type: 'Point',
    coordinates: [+long, +lat],
  };
  const pickupLocation = pickupRepository.create();
  pickupLocation.location = location;
  pickupLocation.routeId = routeId;
  pickupLocation.userId = userId;
  pickupLocation.save();
  return pickupLocation;
};

export const setCurrentLocation = async (io, payload) => {
  const { assetId, long, lat, routeId } = payload;
  io.emit(`GPS-${assetId}`, { long: `${long}`, lat: `${lat}` });

  const pickupRepository = getConnection().getRepository(Pickups);
  const pickup_locations = await pickupRepository.find({ routeId });
  if (pickup_locations) {
    for await (const location of pickup_locations) {
      const clientLocation = location.location.coordinates;
      const distance: number = await calcCrowDistance(
        lat,
        long,
        clientLocation[1],
        clientLocation[0],
      );
      console.log(distance);
      if (distance <= 100 && distance % 10 === 0) {
        io.emit(
          `GPS-${location.userId}`,
          `Asset is aproximately ${distance}Km away`,
        );
      }
    }
  }
  return true;
};

const calcCrowDistance = async (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const lat_1 = toRad(lat1);
  const lat_2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat_1) * Math.cos(lat_2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};
