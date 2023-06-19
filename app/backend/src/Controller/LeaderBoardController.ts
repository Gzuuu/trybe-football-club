import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) {}

  async getHomeLeadeboards(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderBoardHomeInfo();

    res.status(200).json(serviceResponse.data);
  }

  async getAwayLeaderboards(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboardAwayInfo();

    res.status(200).json(serviceResponse.data);
  }

  async getLeaderboardInfo(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboardInfo();

    res.status(200).json(serviceResponse.data);
  }
}
