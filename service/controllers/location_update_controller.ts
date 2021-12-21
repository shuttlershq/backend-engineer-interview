import { EventBus } from './../abstractions/event_bus';
import express from 'express';
import { Trail } from '../types/trail';

class LocationUpdateController {
    handleLocationUpdate(req: express.Request, res: express.Response) {
        EventBus.getInstance().dispatch('new-location', {latitude: req.body.latitude, longitude: req.body.longitude, assetId: req.params.assetId});
    }
}

export default new LocationUpdateController();