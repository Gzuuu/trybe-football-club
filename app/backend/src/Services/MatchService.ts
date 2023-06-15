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
}
