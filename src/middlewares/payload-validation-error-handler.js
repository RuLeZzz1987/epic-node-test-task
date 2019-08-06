import {ValidationError} from "../core/errors";

export default function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).json({code: err.code, message: err.message});
  }

  next(err);
}