import winston from 'winston';
import * as expressDomain from 'express-domain';
import * as expressWinston from 'express-winston';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundHandler from './middlewares/not-found-handler';
import tracingMiddleware from './middlewares/tracing';
import internalRoutes from './routes/internal';
import externalRoutes from './routes/external';

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
  app.use('/api/v1', internalRoutes);
  app.use(`/external`, externalRoutes);
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
