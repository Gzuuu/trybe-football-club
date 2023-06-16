import { ITeam } from './TeamMigrates';
import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from './ICRUDModel';

export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchesModel extends IMatches {
  homeTeam: Pick<ITeam, 'teamName'>,
  awayTeam: Pick<ITeam, 'teamName'>,
}

export interface IReaderMatchType extends ICRUDModelReader<IMatches> {
  findInProgress(bool: boolean): Promise<IMatches[]>;
  createMatch(data: Exclude<IMatches, 'id' | 'inProgress'>): Promise<IMatches>;
}

export type IMatchModelType = IReaderMatchType & ICRUDModelUpdater<IMatches>;
