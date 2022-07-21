class ExtendableError extends Error {
  constructor({ message, status }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

module.exports = ExtendableError;
