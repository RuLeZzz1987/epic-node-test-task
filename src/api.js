import winston from 'winston';
import * as expressDomain from 'express-domain';
import * as expressWinston from 'express-winston';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundHandler from './middlewares/not-found-handler';
import tracingMiddleware from './middlewares/tracing';

export default function registerRoutes(app) {

  app.use(expressDomain());
  app.use(tracingMiddleware);
  app.use(expressWinston.logger({
    level: 'info',
    format: winston.format.json(),
    baseMeta: { service: process.env.HOSTNAME },
    transports: [
      new winston.transports.Console(),
    ]
  }));

  app.get(`/external/`, async (req, res, next) => {
    res.json({ok: 'external ok'})
  });

  app.use('/*', notFoundHandler);
  app.use(expressWinston.errorLogger({
    baseMeta: { service: process.env.HOSTNAME },
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.json()
  }));
  app.use(errorHandlerMiddleware);
}
