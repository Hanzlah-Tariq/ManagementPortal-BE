import Router from 'koa-router';
import { getPoll, singPoll } from './poll.controller';
import { Protect, Authorized } from '../../../middleware/auth';
const router = Router({
  prefix: '/poll'
}); // @ Todo (hanzlah) i think remove the Authorized middleware in get url later fix in future

router.get('/', Protect, Authorized(0, 1, 2, 3), getPoll);
router.get('/:id', Protect, Authorized(0, 1, 2, 3), singPoll);
export default router;