export default class ErrorHandler extends Error {
  public status: number;
  public adicionalInfo?: string;

  constructor(
    message: string,
    status: number,
    adicionalInfo?: string
  ) {
    super();
    this.status = status;
    this.message = message;
    this.adicionalInfo = adicionalInfo

    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}