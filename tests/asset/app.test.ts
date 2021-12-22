'use strict';

import config from "../../asset/config/app";
import AssetApp from "../../asset/app";

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('Can update location in a given interval.', () => {
    AssetApp.run(0);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), config.broadcastInterval);
});