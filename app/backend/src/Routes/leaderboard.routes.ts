import { Request, Router, Response } from 'express';
import LeaderBoardController from '../Controller/LeaderBoardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeadeboards(req, res),
);

export default router;
