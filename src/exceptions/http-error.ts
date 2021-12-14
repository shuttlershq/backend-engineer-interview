export default class HttpError extends Error {
  [x: string]: any;
  constructor(httpStatusCode: any, message: string) {
    super();
    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
