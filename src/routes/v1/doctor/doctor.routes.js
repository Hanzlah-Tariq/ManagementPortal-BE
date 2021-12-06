import Router from 'koa-router';
import { getDoctorPatients } from './doctor.controller';
import { Protect, Authorized } from '../../../middleware/auth';

const router = Router({ prefix: '/doc' });

router.get('/', Protect, Authorized( 1), getDoctorPatients);

export default router;
