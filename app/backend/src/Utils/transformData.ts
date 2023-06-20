import { IMatchesModel } from '../Interfaces/MatchesMigrate';
import { LeaderboardType } from '../Interfaces/Leaderboard';
import { ITeam } from '../Interfaces/TeamMigrates';

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

export const transformData = (jogos: IMatchesModel[]): LeaderboardType[] => {
  const teams: { [teamName: string]: LeaderboardType } = {};

  jogos.forEach((jogo) => {
    const homeTeamName = jogo.homeTeam?.teamName;
    const awayTeamName = jogo.awayTeam?.teamName;
    const { homeTeamGoals, awayTeamGoals } = jogo;

    if (homeTeamName && awayTeamName) {
      teams[homeTeamName] = generateTeamsIfNotExist(teams, homeTeamName);
      teams[awayTeamName] = generateTeamsIfNotExist(teams, awayTeamName);

      teams[homeTeamName].totalGames += 1;
      teams[awayTeamName].totalGames += 1;
      teams[homeTeamName].goalsFavor += homeTeamGoals;
      teams[awayTeamName].goalsFavor += awayTeamGoals;
      teams[homeTeamName].goalsOwn += awayTeamGoals;
      teams[awayTeamName].goalsOwn += homeTeamGoals;

      incrementResult({ teams, awayTeamName, homeTeamName, awayTeamGoals, homeTeamGoals });
    }
  });

  return Object.values(teams);
};

const incrementHomeTeamResult = (teamsInfo: TeamIncrementType) => {
  const team = teamsInfo.teams[teamsInfo.homeTeamName];

  if (teamsInfo.homeTeamGoals > teamsInfo.awayTeamGoals) {
    team.goalsFavor += teamsInfo.homeTeamGoals;
    team.goalsOwn += teamsInfo.awayTeamGoals;
    team.totalPoints += 3;
    team.totalVictories += 1;
  } else if (teamsInfo.homeTeamGoals < teamsInfo.awayTeamGoals) {
    team.totalLosses += 1;
    team.goalsFavor += teamsInfo.homeTeamGoals;
    team.goalsOwn += teamsInfo.awayTeamGoals;
  } else {
    team.goalsFavor += teamsInfo.homeTeamGoals;
    team.goalsOwn += teamsInfo.awayTeamGoals;
    team.totalPoints += 1;
    team.totalDraws += 1;
  }
};

const incrementAwayTeamResult = (teamsInfo: TeamIncrementType) => {
  const team = teamsInfo.teams[teamsInfo.awayTeamName];

  if (teamsInfo.homeTeamGoals > teamsInfo.awayTeamGoals) {
    team.goalsFavor += teamsInfo.awayTeamGoals;
    team.goalsOwn += teamsInfo.homeTeamGoals;
    team.totalLosses += 1;
  } else if (teamsInfo.homeTeamGoals < teamsInfo.awayTeamGoals) {
    team.totalVictories += 1;
    team.totalPoints += 3;
    team.goalsFavor += teamsInfo.awayTeamGoals;
    team.goalsOwn += teamsInfo.homeTeamGoals;
  } else {
    team.goalsFavor += teamsInfo.awayTeamGoals;
    team.goalsOwn += teamsInfo.homeTeamGoals;
    team.totalPoints += 1;
    team.totalDraws += 1;
  }
};

export const transformHomeTeam = (jogos: IMatchesModel[], team: ITeam[]): LeaderboardType[] => {
  const teams: { [teamName: string]: LeaderboardType } = {};
  const matches = jogos.filter((jogo) => team.map((t) => jogo.homeTeamId === t.id));

  matches.forEach((match) => {
    const { homeTeamGoals } = match;
    const { awayTeamGoals } = match;
    const homeTeamName = match.homeTeam?.teamName;
    if (homeTeamName) {
      teams[homeTeamName] = generateTeamsIfNotExist(teams, homeTeamName);

      teams[homeTeamName].totalGames += 1;

      incrementHomeTeamResult({
        teams,
        homeTeamName,
        homeTeamGoals,
        awayTeamGoals,
        awayTeamName: '' });
    }
  });

  return Object.values(teams);
};

export const transformAwayTeam = (jogos: IMatchesModel[], team: ITeam[]): LeaderboardType[] => {
  const teams: { [teamName: string]: LeaderboardType } = {};
  const matches = jogos.filter((jogo) => team.map((t) => jogo.awayTeamId === t.id));

  matches.forEach((match) => {
    const { homeTeamGoals } = match;
    const { awayTeamGoals } = match;
    const awayTeamName = match.awayTeam?.teamName;
    if (awayTeamName) {
      teams[awayTeamName] = generateTeamsIfNotExist(teams, awayTeamName);

      teams[awayTeamName].totalGames += 1;

      incrementAwayTeamResult({
        teams,
        awayTeamName,
        awayTeamGoals,
        homeTeamGoals,
        homeTeamName: '' });
    }
  });

  return Object.values(teams);
};
