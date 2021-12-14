import { User } from '../../modules/authentication/entities/auth.entity';

export default (factory: any) => {
  factory.define('user', User, {
    id: factory.chance('guid'),
    email: factory.chance('email'),
    password: factory.chance('word', { length: 8 }),
    createdAt: factory.chance('date'),
    updatedAt: factory.chance('date'),
  } as ElementDefinitionOptions);
};
