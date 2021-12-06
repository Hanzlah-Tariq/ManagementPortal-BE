import Router from 'koa-router';
import { addPatient, getAllPatients, singPatient, uptPatient, delPatient, patientRecord } from './patients.controller';
import { Protect, Authorized } from '../../../middleware/auth';
const router = Router({
  prefix: '/patient'
}); // @ Todo (hanzlah) i think remove the Authorized middleware in get url later fix in future

router.post('/create', Protect, Authorized(0, 1, 2), addPatient);
router.get('/', Protect, Authorized(0, 1, 2, 3), getAllPatients);
router.get('/:id', Protect, Authorized(0, 1, 2, 3), singPatient);
router.put('/:id', Protect, Authorized(0, 1, 2, 3), uptPatient);
router.del('/:id', Protect, Authorized(1, 2), delPatient);
router.get('/:id/record', Protect, patientRecord);
export default router;