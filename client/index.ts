import { error, warning } from "./config/console_colors";
import AssetClient  from "./app";

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

AssetClient.run(assetId);