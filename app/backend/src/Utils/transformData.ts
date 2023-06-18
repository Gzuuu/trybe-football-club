import { IMatchesModel } from '../Interfaces/MatchesMigrate';
import { LeaderboardType } from '../Interfaces/Leaderboard';

interface TeamIncrementType {
  teams: { [teamName: string]: LeaderboardType },
  homeTeamName: string,
  awayTeamName: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

const incrementResult = (teamsInfo: TeamIncrementType) => {
  const team = teamsInfo.teams[teamsInfo.homeTeamName];
  const opponent = teamsInfo.teams[teamsInfo.awayTeamName];

  if (teamsInfo.homeTeamGoals > teamsInfo.awayTeamGoals) {
    team.totalPoints += 3;
    team.totalVictories += 1;
    opponent.totalLosses += 1;
  } else if (teamsInfo.homeTeamGoals < teamsInfo.awayTeamGoals) {
    team.totalLosses += 1;
    opponent.totalPoints += 3;
    opponent.totalVictories += 1;
  } else {
    team.totalPoints += 1;
    team.totalDraws += 1;
    opponent.totalPoints += 1;
    opponent.totalDraws += 1;
  }
};

const generateTeamsIfNotExist = (
  teams: { [teamName: string]: LeaderboardType },
  teamName: string,
) => {
  let team = teams[teamName];
  if (!team) {
    team = {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };

    return team;
  }
  return team;
};

const transformData = (jogos: IMatchesModel[]): LeaderboardType[] => {
  const teams: { [teamName: string]: LeaderboardType } = {};

  jogos.forEach((jogo) => {
    const homeTeamName = jogo.homeTeam.teamName;
    const awayTeamName = jogo.awayTeam.teamName;
    const { homeTeamGoals } = jogo;
    const { awayTeamGoals } = jogo;

    teams[homeTeamName] = generateTeamsIfNotExist(teams, homeTeamName);

    teams[awayTeamName] = generateTeamsIfNotExist(teams, awayTeamName);

    teams[homeTeamName].totalGames += 1;
    teams[awayTeamName].totalGames += 1;
    teams[homeTeamName].goalsFavor += homeTeamGoals;
    teams[awayTeamName].goalsFavor += awayTeamGoals;
    teams[homeTeamName].goalsOwn += awayTeamGoals;
    teams[awayTeamName].goalsOwn += homeTeamGoals;

    incrementResult({ teams, awayTeamName, homeTeamName, awayTeamGoals, homeTeamGoals });
  });

  return Object.values(teams);
};

export default transformData;
