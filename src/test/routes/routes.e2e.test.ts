import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import app from '../../config/app';
import request from 'supertest';
import { getDbConfig } from '../../config/database.config';
import factory from '../factories';
import { Routes } from '../../modules/routes/entities/routes.entity';

describe('Routes (E2E)', () => {
  const url = '/routes';
  let rq: request.SuperTest<request.Test>;
  let routeRepository;
  beforeAll(async () => {
    await createConnection({ type: 'postgres', ...getDbConfig })
      .then(() => {
        console.log('Db connected');
        routeRepository = getConnection().getRepository(Routes);
      })
      .catch((error) => console.log(error));

    rq = request(app);
  });

  afterEach(async () => {
    await routeRepository.query(`DELETE FROM routes;`);
  });

  describe(`POST ${url}`, () => {
    it('should fail to create a route', async () => {
      const routes = await factory.buildMany('route', 2);
      await routeRepository.save(routes);
      await rq
        .post(`${url}/create-route`)
        .set('Accept', 'application/json')
        .send({
          startLong: '7.287538899999995',
          startLat: '5.159500153964703',
          stopLong: '7.306781053771028',
          stopLat: '5.140720867298387',
          assetId: 'd5fff1c7-7be6-4b12-a9da-cc4246e9c539',
        })
        .expect(401);
    });
  });
});
