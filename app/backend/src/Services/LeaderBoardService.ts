import transformData from '../Utils/transformData';
import { LeaderboardType } from '../Interfaces/Leaderboard';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderBoardService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  async leaderBoardInfo(): Promise<ServiceResponse<LeaderboardType[]>> {
    const matches = await this.matchModel.findInProgress(false);

    const leaderBoards = transformData(matches);

    return { status: 'SUCCESSFUL', data: leaderBoards };
  }
}
