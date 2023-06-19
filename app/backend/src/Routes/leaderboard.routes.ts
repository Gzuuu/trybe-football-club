import { Request, Router, Response } from 'express';
import LeaderBoardController from '../Controller/LeaderBoardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboardInfo(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeadeboards(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayLeaderboards(req, res),
);

export default router;
