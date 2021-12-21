import { Trail } from './types/trail';
import { AssetsRoutes } from './routes/v1/assets';
import express from 'express';
import * as http from 'http';
import { WebSocketServer } from 'ws';

import { EventBus } from './abstractions/event_bus';

import { error, warning } from "./config/console_colors";


import { V1RoutesConfig } from './routes/common/v1';

// REST Server
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const v1Routes: Array<V1RoutesConfig> = [];

const clients: { [key: string]: NodeJS.Timer } = {};
const assetTrailPair: { [key: string]: Trail } = {};

var tcpAliveFlag = false;

app.use(express.json());

v1Routes.push(new AssetsRoutes(app));


// Event Bus.
EventBus.getInstance().register('new-location', (trail: Trail) => {
    assetTrailPair[trail.assetId] = trail;
});

// Hook Up REST Server.
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data: string) {
        let payload: { assetId?: number, id?: string, sigkill?: boolean } = JSON.parse(data);
        if (payload.id) {
            // If sigkill is undefined or false, this part is running for the first time for a single connection.
            if (!payload.sigkill) console.log(`Client with ID: ${payload.id} Connected.`);

            ws.send(JSON.stringify({ message: "Subscribed successfully" }));
            clients[payload.id as string] = setInterval(function () {
                try {
                    ws.send(JSON.stringify({ message: "Location Update", trail: assetTrailPair[payload.assetId as number] }));
                } catch (e) {
                    console.log(error, e);
                    clearInterval(clients[payload.id as string]);
                }
            }.bind(this), 5000);
        } else if (payload.sigkill) {
            console.log(`Closing Connection with Client: ${payload.id}`);
            clearInterval(clients[payload.id as string]);
        }
    });
});

console.log("Web Socket is Up and Running on Port 8080");

const geoFencingWatchdog = () => {

}

// Can write a watchdog function here to check if the TCP connections are alive.
