import Router from 'koa-router';
import { getMedicines, addMedicine, updateMedicine, deleteMedicine } from './medicine.controller';
import { Protect, Authorized } from '../../../middleware/auth';
const router = Router({
  prefix: '/medicine'
});
router.post('/add', Protect, Authorized(1), addMedicine);
router.get('/', Protect, Authorized(1, 2), getMedicines);
router.put('/:id', Protect, Authorized(1), updateMedicine);
router.del('/:id', Protect, Authorized(1), deleteMedicine);
export default router;