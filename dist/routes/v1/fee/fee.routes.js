import Router from 'koa-router';
import { getFee, addFee, updateFee } from './fee.controller';
import { Protect, Authorized } from '../../../middleware/auth';
const router = Router({
  prefix: '/fee'
});
router.post('/add', Protect, Authorized(1), addFee);
router.get('/', Protect, Authorized(1), getFee);
router.put('/', Protect, Authorized(1), updateFee);
export default router;