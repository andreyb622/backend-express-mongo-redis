export default class ConsistencyError extends Error {
  constructor({ message = 'Mongodb consistency error' }: { message?: string }) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
