import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import app from '../../config/app';
import request from 'supertest';
import { getDbConfig } from '../../config/database.config';
import factory from '../factories';
import { User } from '../../modules/authentication/entities/auth.entity';

describe('Authentication (E2E)', () => {
  const url = '/auth';
  let rq: request.SuperTest<request.Test>;
  let userRepository;
  beforeAll(async () => {
    await createConnection({ type: 'postgres', ...getDbConfig })
      .then(() => {
        console.log('Db connected');
        userRepository = getConnection().getRepository(User);
      })
      .catch((error) => console.log(error));

    rq = request(app);
  });

  afterEach(async () => {
    await userRepository.query(`DELETE FROM users;`);
  });

  describe(`POST ${url}`, () => {
    it('should create a user', async () => {
      const users = await factory.buildMany('user', 2);
      await userRepository.save(users);
      const { body } = await rq
        .post(`${url}/signup`)
        .set('Accept', 'application/json')
        .send({
          email: 'tester@testuser.com',
          password: 'password',
        })
        .expect(201);
      expect(body).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        }),
      );
    });

    it('should fail if email already exits', async () => {
      const users = await factory.buildMany('user', 2);
      await userRepository.save(users);
      const { body } = await rq
        .post(`${url}/signup`)
        .set('Accept', 'application/json')
        .send({
          email: users[0].email,
          password: users[0].password,
        })
        .expect(400);
      expect(body.message).toEqual(`Email ${users[0].email} already in use.`);
    });
  });
});
