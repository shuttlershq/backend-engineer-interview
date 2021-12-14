import { Routes } from '../../modules/routes/entities/routes.entity';

export default (factory: any) => {
  factory.define('route', Routes, {
    id: factory.chance('guid'),
    assetId: 'd5fff1c7-7be6-4b12-a9da-cc4246e9c539',
    distance: 3,
    start: {
      type: 'Point',
      coordinates: [7.287538899999995, 5.159500153964703],
    },
    stop: {
      type: 'Point',
      coordinates: [7.306781053771028, 5.140720867298387],
    },
    createdAt: factory.chance('date'),
    updatedAt: factory.chance('date'),
  } as ElementDefinitionOptions);
};
