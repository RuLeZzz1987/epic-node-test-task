import uuid from 'uuid/v4';

export default function tracing(req, res, next) {
  req.headers['request-id'] = req.headers['request-id'] || uuid();
  next();
}