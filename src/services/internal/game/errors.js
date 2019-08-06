export class GameServiceError extends Error {

  constructor(code, message) {
    super(message);
    this.code = code;
  }

}

export class GameServicePayloadError extends GameServiceError {}

export class GameServiceRestrictionError extends GameServiceError {}