import 'reflect-metadata';
import app from '../../config/app';
import request from 'supertest';
import factory from '../factories';
import * as routesService from '../../modules/routes/routes.service';

jest.mock('../../modules/routes/routes.service');
const mockedRoutesServices = routesService as jest.Mocked<typeof routesService>;

describe('Routes (Unit)', () => {
  const url = '/routes';
  let rq: request.SuperTest<request.Test>;
  beforeAll(async () => {
    rq = request(app);
  });

  describe(`POST ${url}`, () => {
    it('should create a route', async () => {
      const routes = await factory.buildMany('route', 2);
      mockedRoutesServices.createRoute.mockResolvedValue(routes[0]);
      const { body } = await rq
        .post(`${url}/create-route`)
        .set('Accept', 'application/json')
        .send({
          startLong: '7.287538899999995',
          startLat: '5.159500153964703',
          stopLong: '7.306781053771028',
          stopLat: '5.140720867298387',
          assetId: 'd5fff1c7-7be6-4b12-a9da-cc4246e9c539',
        })
        .expect(201);
      expect(body).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        }),
      );
    });
  });
});
