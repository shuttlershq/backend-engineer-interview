import LocationUpdateController from "../../asset/controllers/location_update_controller";

LocationUpdateController.broadcastLocation

test('Can broadcast location to the service as an asset', done => {
    LocationUpdateController.broadcastLocation(0, (code: number) => {
        try {
            expect(code).toBe(204);
            done();
        } catch (error) {
            done(error);
        }
    });
});