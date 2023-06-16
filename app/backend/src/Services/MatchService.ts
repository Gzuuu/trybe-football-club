import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModelType, IMatches } from '../Interfaces/MatchesMigrate';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private model: IMatchModelType = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.model.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getInProgressMatches(query: string): Promise<ServiceResponse<IMatches[]>> {
    const boolean = query === 'true';
    const matches = await this.model.findInProgress(boolean);

    return { status: 'SUCCESSFUL', data: matches };
  }
}
