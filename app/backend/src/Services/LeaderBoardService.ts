import transformData from '../Utils/transformData';
import { LeaderboardType } from '../Interfaces/Leaderboard';
import MatchModel from '../models/MatchModel';

export default class LeaderBoardService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  async leaderBoardInfo(): Promise<LeaderboardType[]> {
      const matches = await this.matchModel.findInProgress(true);

      const leaderBoards = transformData(matches);

      return leaderBoards;
  }
}
