export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the prototype chain is correctly set for instanceof to work
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
