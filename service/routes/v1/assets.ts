import { V1RoutesConfig } from '../common/v1';
import express from 'express';

import LocationUpdateController from '../../controllers/location_update_controller';

export class AssetsRoutes extends V1RoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AssetsRoutes');
    }

    configureRoutes() {
        this.app.route(`/${this.version}/assets/:assetId/location`).post(LocationUpdateController.handleLocationUpdate);

        return this.app;
    }
}