import { joiValidate } from '../utils/validation';
import * as schemas from '../validation';

/**
 * Validate incoming inputs from request body using Joi.
 * @param {String} schemaCollection Collection of all schema related to a resource.
 * @param {String} schemaName Name of schema to validate.
 */
const validateBody =
  (schemaCollection: string, schemaName: string) => (req, res, next) => {
    const controllerSchemaFunc = schemas[schemaCollection][schemaName];

    const requestData = joiValidate(controllerSchemaFunc, {
      ...req.body,
      ...req.params,
    });

    if (requestData.error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
        errors: requestData.error,
      });
    }

    Object.assign(req.body, requestData);

    next();
    return true;
  };

export default validateBody;
