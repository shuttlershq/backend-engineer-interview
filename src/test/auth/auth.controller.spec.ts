import 'reflect-metadata';
import app from '../../config/app';
import request from 'supertest';
import factory from '../factories';
import * as authService from '../../modules/authentication/auth.service';

jest.mock('../../modules/authentication/auth.service');
const mockedAuthServices = authService as jest.Mocked<typeof authService>;

describe('Authentication (Unit)', () => {
  const url = '/auth';
  let rq: request.SuperTest<request.Test>;
  beforeAll(async () => {
    rq = request(app);
  });

  describe(`POST ${url}`, () => {
    it('should create a user', async () => {
      const users = await factory.buildMany('user', 2);
      mockedAuthServices.signup.mockResolvedValue(users[0]);
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
  });
});
