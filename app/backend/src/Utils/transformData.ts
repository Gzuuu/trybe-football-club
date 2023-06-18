import { IMatchesModel } from "../Interfaces/MatchesMigrate";
import { LeaderboardType } from "../Interfaces/Leaderboard";

const transformData = (jogos: IMatchesModel[]): LeaderboardType[] => {
  const teams: { [teamName: string]: LeaderboardType } = {};

  jogos.forEach((jogo) => {
    const homeTeamName = jogo.homeTeam.teamName;
    const awayTeamName = jogo.awayTeam.teamName;
    const homeTeamGoals = jogo.homeTeamGoals;
    const awayTeamGoals = jogo.awayTeamGoals;

    if (!teams[homeTeamName]) {
      teams[homeTeamName] = {
        name: homeTeamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalFavor: 0,
        totalOwn: 0,
      };
    }

    if (!teams[awayTeamName]) {
      teams[awayTeamName] = {
        name: awayTeamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalFavor: 0,
        totalOwn: 0,
      };
    }

    teams[homeTeamName].totalGames++;
    teams[awayTeamName].totalGames++;
    teams[homeTeamName].totalFavor += homeTeamGoals;
    teams[awayTeamName].totalFavor += awayTeamGoals;
    teams[homeTeamName].totalOwn += awayTeamGoals;
    teams[awayTeamName].totalOwn += homeTeamGoals;

    if (homeTeamGoals > awayTeamGoals) {
      teams[homeTeamName].totalPoints += 3;
      teams[homeTeamName].totalVictories++;
      teams[awayTeamName].totalLosses++;
    } else if (homeTeamGoals < awayTeamGoals) {
      teams[awayTeamName].totalPoints += 3;
      teams[awayTeamName].totalVictories++;
      teams[homeTeamName].totalLosses++;
    } else {
      teams[homeTeamName].totalPoints++;
      teams[awayTeamName].totalPoints++;
      teams[homeTeamName].totalDraws++;
      teams[awayTeamName].totalDraws++;
    }
  });

  return Object.values(teams);
};

export default transformData;