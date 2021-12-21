import { error, warning } from "./config/console_colors";
import { WebSocket } from 'ws';
import { v4 as uuidV4 } from 'uuid';

declare var process: {
    argv: Array<string>,
    exit: Function
    on: Function,
    platform: string,
    emit: Function,
    stdin: any,
    stdout: any
}

const assetId: number = process.argv.length > 2 ? parseInt(process.argv[2]) : 0;

if (isNaN(assetId)) {
    console.log(error, "Invalid asset ID given.");
    process.exit(1);
}

const ws: WebSocket = new WebSocket('ws://localhost:8080');

const subscriptionPayload: {
    assetId: number; // Asset ID.
    id: string; // Client ID
} = {
    assetId: assetId,
    id: uuidV4()
};

ws.on('open', function open() {
    ws.send(JSON.stringify(subscriptionPayload));
});

ws.on('message', function message(data: string) {
    console.log('Received Trail: %s', data);
});

console.log(`Subscribed with Client ID: ${subscriptionPayload.id}`);

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function () {
    ws.send(JSON.stringify({ id: subscriptionPayload.id, sigkill: true }));
    process.exit();
});
