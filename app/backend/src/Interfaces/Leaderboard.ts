export interface LeaderboardType {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface LeaderbordTypeBalance extends LeaderboardType {
  goalsBalance: number,
  efficiency: string,
}
