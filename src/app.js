/* eslint-disable no-console */
import Koa from 'koa';
import serve from 'koa-static';
import cors from '@koa/cors';
import '@babel/polyfill';
import Logger from 'loglevel';
import Router from 'koa-router';
import dateFormat from 'dateformat';
import BodyParser from 'koa-bodyparser';
import fileParser from '@koa/multer';


// Route imports
import index from './routes';
import mongodb from './services/MongoDB';
import { DATE_FORMAT } from './common/constants';
import user from './routes/v1/user/user.routes';
import employees from './routes/v1/employee/employee.routes';
import patients from './routes/v1/patients/patients.routes';
import poll from './routes/v1/poll/poll.routes';
import Medicine from './routes/v1/medicine/medicine.routes';
import Fee from './routes/v1/fee/fee.routes';
import Doc from './routes/v1/doctor/doctor.routes';

import config from './config';
import logger from './middleware/logger';

// Define logger level
Logger.setLevel(config.logLevel);

// Initialize server
Logger.info(`time="${dateFormat(Date.now(), DATE_FORMAT, true)}" level=INFO message="Initializing node-server..."`);

const koa = new Koa();

const router = Router();
const v1router = Router();
const fileStorage = fileParser.diskStorage({
  destination: (ctx, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (ctx, file, cb) => {
    const type = file.originalname.split('.')[1];
    cb(null, `${file.fieldname}-${new Date().toISOString()}.${type}`);
  },
});


// Declare v1 routes
v1router.use(user.routes());
v1router.use(employees.routes());
v1router.use(patients.routes());
v1router.use(poll.routes());
v1router.use(Medicine.routes());
v1router.use(Fee.routes());
v1router.use(Doc.routes());

// set cors
koa.use(cors());

// Declare root routes
router.use(index.routes());
router.use('/v1', v1router.routes());


// middleware for file uploading
koa.use(fileParser({ storage: fileStorage }).single('file'));

// Set static folder for uploading images
koa.use(serve('./uploads'));

// Dev logging middleware
koa.use(logger);

// Middleware
koa.use(BodyParser({
  extendTypes: {
    json: ['application/x-javascript', 'application/vnd.cia.v1+json'],
  },
}));

// Use routes
koa.use(router.routes());

// Listen to port
const port = config.serverPort;
const server = koa.listen(port, () => {
  Logger.info(`time="${dateFormat(Date.now(), DATE_FORMAT, true)}" level=INFO message="node-server started running on ${port}"`);
});

export default {
  server,
  mongodb,
};
