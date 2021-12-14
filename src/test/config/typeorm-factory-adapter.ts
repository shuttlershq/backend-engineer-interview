class TypeormFactoryAdapter {
  build(Model, props) {
    const model = new Model(props);
    return this.set(props, model, Model);
  }

  async save(model, _Model) {
    return model;
  }

  async destroy(model, _Model) {
    return model;
  }

  get(model, attr, _Model) {
    return model[attr];
  }

  set(props, model, _Model) {
    Object.keys(props).forEach((key) => {
      model[key] = props[key];
    });
    return model;
  }
}

export default TypeormFactoryAdapter;
