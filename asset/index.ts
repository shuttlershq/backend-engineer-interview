import hypotheticalTrailSets from "./models/mocks";
import { error} from "./config/console_colors";
import config from "./config/app";
import AssetApp from "./app";

declare var process: {
    argv: Array<string>,
    exit: Function
}

const trailNumber: number = process.argv.length > 2 ? parseInt(process.argv[2]) : 0;

if (isNaN(trailNumber) || trailNumber > hypotheticalTrailSets.length - 1) {
    console.log(error, "Invalid trail number given, please provide a number between 0 and " + (hypotheticalTrailSets.length - 1));
    process.exit(1);
}

AssetApp.run(trailNumber);
