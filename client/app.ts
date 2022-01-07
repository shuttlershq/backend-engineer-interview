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

class AssetClient {
    private readonly ws: WebSocket = new WebSocket('ws://localhost:8080');
    private assetId?: number;
    private id?: string;
    // Internal Running Flag.
    private running: boolean = false;

    constructor() {
        this.id = uuidV4();
    }

    run(assetId: number) {
        if (this.running) {
            console.log("Asset client already running");
            return;
        }

        this.running = true;

        this.assetId = assetId;

        this.ws.on('open', function open() {
            this.ws.send(JSON.stringify(this.getSubscriptionPayload()));
        }.bind(this));

        this.ws.on('message', function message(data: string) {
            console.log('Received Trail: %s', data);
        });

        console.log(`Subscribed with Client ID: ${this.getSubscriptionPayload().id}`);

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
            this.ws.send(JSON.stringify({ id: this.getSubscriptionPayload().id, sigkill: true }));
            process.exit();
        }.bind(this));
    }

    getSubscriptionPayload(): {
        assetId: number;
        id: string;
    } {
        return {
            assetId: this.assetId,
            id: this.id
        }
    }
}

export default new AssetClient();