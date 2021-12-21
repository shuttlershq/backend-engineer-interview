import hypotheticalTrailSets from "../models/mocks";
import { getRandomNumber } from "../helpers/integer_helper";
import { generatePostMethodHeader } from "../helpers/http_helper";
import { Trail } from './../types/trail';
import { postOptions } from "../config/http";

declare function require(name: string): any;

const http = require('http');

class LocationUpdateController {
    broadcastLocation(assetId: number) {
        let trail: Trail = hypotheticalTrailSets[assetId][getRandomNumber(0, hypotheticalTrailSets.length - 1)];

        let body = {
            latitude: trail.latitude,
            longitude: trail.longitude,
        };

        console.log(`Broadcasting Trail ${trail.latitude}:${trail.longitude}`);

        const req = http.request({ ...postOptions, path: `/v1/assets/${assetId}/location`, headers: generatePostMethodHeader(body) }, (res: any) => {
            if (res.statusCode == 204) {
                console.log("Successfully broadcasted location");
            }
        })

        req.on('error', (error: any) => {
            console.error(error);
        })

        req.write(JSON.stringify(body));
        req.end();
    }
}

export default new LocationUpdateController();