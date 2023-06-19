import { LeaderboardType, LeaderbordTypeBalance } from '../Interfaces/Leaderboard';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { transformAwayTeam, transformData, transformHomeTeam } from '../Utils/transformData';
import { ITeamModel } from '../Interfaces/TeamMigrates';
import TeamModel from '../models/TeamModel';

export default class LeaderBoardService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  async leaderBoardHomeInfo(): Promise<ServiceResponse<LeaderbordTypeBalance[]>> {
    const matches = await this.matchModel.findInProgress(false);
    const teams = await this.teamModel.findAll();
    const leaderboard = transformHomeTeam(matches, teams);
    const leaderBoardWithEfficiency = LeaderBoardService.makeLeaderboardEfficiency(leaderboard);

    return { status: 'SUCCESSFUL', data: LeaderBoardService.orderTeams(leaderBoardWithEfficiency) };
  }

  async leaderboardAwayInfo(): Promise<ServiceResponse<LeaderbordTypeBalance[]>> {
    const matches = await this.matchModel.findInProgress(false);
    const teams = await this.teamModel.findAll();
    const leaderboard = transformAwayTeam(matches, teams);
    const leaderBoardWithEfficiency = LeaderBoardService.makeLeaderboardEfficiency(leaderboard);

    return { status: 'SUCCESSFUL', data: LeaderBoardService.orderTeams(leaderBoardWithEfficiency) };
  }

  async leaderboardInfo(): Promise<ServiceResponse<LeaderbordTypeBalance[]>> {
    const matches = await this.matchModel.findInProgress(false);
    const leaderboard = transformData(matches);
    const leaderBoardWithEfficiency = LeaderBoardService.makeLeaderboardEfficiency(leaderboard);

    return { status: 'SUCCESSFUL', data: LeaderBoardService.orderTeams(leaderBoardWithEfficiency) };
  }

  static makeLeaderboardEfficiency(teams: LeaderboardType[]): LeaderbordTypeBalance[] {
    const result = teams.map((team) => {
      const teamWithEfficiency = {
        ...team,
        goalsBalance: team.goalsFavor - team.goalsOwn,
        efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
      };

      return teamWithEfficiency;
    });

    return result;
  }

  static orderTeams(teams: LeaderbordTypeBalance[]): LeaderbordTypeBalance[] {
    return teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });
  }
}
