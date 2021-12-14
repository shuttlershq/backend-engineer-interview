import express, { Express, Response, Request, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';
import routes from '../routes';
import { HttpException } from '../exceptions/http-exceptions';
import { log } from '../utils/logger';

dotenv.config();

const app: Express = express();

app.use(
  express.json({
    limit: '50mb',
  }),
);
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1000,
  });
  app.use(limiter);
}

app.use((req, res, next) => {
  const reqId = uuidv4();
  res.locals.log = log.child({ reqId });
  next();
});

app.options('*', cors());

app.use('/', routes);

app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const path = req.route ? req.route.path : null;
    console.error(`Error processing request for route: ${req.method} ${path}`);
    console.error(err);
    let message: string;
    let code = 500;
    if (err.message === 'Not allowed by CORS') {
      message = "Ops! You don't have permission to view this route 😔";
      code = 401;
    } else {
      message = 'Unable to complete operation 😫';
    }
    res.status(code).json({ success: false, message });
    next(err);
  },
);

app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found 🤕' });
});

export default app;
