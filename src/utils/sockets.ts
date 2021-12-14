export const emitLocation = async (io, payload) => {
  const { assetId, location } = payload;
  io.emit(`${assetId}`, `${location}`);
};
