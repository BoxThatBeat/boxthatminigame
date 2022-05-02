module.exports = class Response {

  message;
  isError;

  constructor(message, isError) {
    this.message = message;
    this.isError = isError;
  }
}