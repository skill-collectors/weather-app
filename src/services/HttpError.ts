export default class HttpError extends Error {
  public readonly httpStatusCode: number

  constructor(httpStatusCode: number, message: string) {
    super(message)

    this.httpStatusCode = httpStatusCode

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}
