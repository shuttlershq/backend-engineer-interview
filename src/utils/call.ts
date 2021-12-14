/**
 * @description A high order function that wraps controller methods with a try/catch block
 * @param {String} controllerName The name of the controller
 * @param {Function} controller The controller method
 * @returns {Function} Returns an express middleware
 */
export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    if (err.httpStatusCode) {
      return res
        .status(err.httpStatusCode)
        .json({ success: false, message: err.message });
    }
    return next(err);
  }
};
