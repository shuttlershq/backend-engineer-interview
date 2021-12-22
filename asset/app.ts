import config from "./config/app";
import LocationUpdateController from "./controllers/location_update_controller";

class AssetApp {
    // Internal Running Flag.
    private running: boolean = false;

    run(trailNumber: number) {
        if (this.running) {
            console.log("Asset app already running");
            return;
        }

        setInterval(() => {
            LocationUpdateController.broadcastLocation(trailNumber);
        }, config.broadcastInterval);

        this.running = true;
        console.log("Initialized!");
    }
}

export default new AssetApp();