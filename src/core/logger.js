import winston from 'winston';

export default winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: process.env.HOSTNAME },
  transports: [
    new winston.transports.Console(),
  ]
});
