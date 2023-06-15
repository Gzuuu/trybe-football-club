import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './user.routes';
import MatchRouter from './matches.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', MatchRouter);

export default router;
