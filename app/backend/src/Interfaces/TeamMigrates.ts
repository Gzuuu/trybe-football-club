import { ICRUDModelReader } from './ICRUDModel';

export interface ITeam {
  id: number,
  teamName: string,
}

export type ITeamModel = ICRUDModelReader<ITeam>;
