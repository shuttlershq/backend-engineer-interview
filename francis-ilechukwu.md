# Asset Tracker Challenge

You need `npm` to run this project.

There are three components in this project, they are as follows and in folder names:

- `asset`: They are the location beamers that broadcast their location to the service, as described in `README.md`.
- `service`: The part that receives location updates from the asset beamers and broadcasts them to all clients.
- `client`: The part that connect to the service with a given asset id.

The unique identifier for an asset is a numeric id that ranges from 0 to 5. (I intend to simulate up to 5 assets but at the moment we have two which leaves the range at 0 to 1).

## Get Started

To demo this project, you have to open 3 terminal tabs or windows with each of them in the `asset`, `service` and `client` folders respectively.

### service

Begin by starting up the service by running `npm start` in the CLI window or tab that's at the `service` folder location. The service should report setting up the web socket server and `http` server.

### asset

Go to the CLI window or tab that's at the `asset` folder location and run `npm start` to start the asset beamers.

__NB:__ The asset beamers `npm start` command takes an argument of the asset id the asset instance should emulate. It should be a number from 0 to 5 as stated above (for now 0 to 1 is the valid range). The default value of this argument is 0.

below's an example of how ti run the asset instance with asset id 1:

```bash
npm start 1
```

### client

Go to the CLI window or tab that's at the `client` folder location and run `npm start` to start the client. The client's `npm start` command takes an argument which is the id of the asset the client should listen to location updates for.


A typical way i'd run this project is shown below.

![Sample](https://github.com/francis94c/backend-engineer-interview/blob/master/assets/images/sample.png?raw=true)