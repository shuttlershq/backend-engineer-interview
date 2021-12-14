import * as factories from './factories';
import TypeormFactoryAdapter from '../config/typeorm-factory-adapter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const factory = require('factory-girl').factory;

factory.setAdapter(new TypeormFactoryAdapter());
Object.values(factories).map((modelDefinition) => modelDefinition(factory));

export default factory;
