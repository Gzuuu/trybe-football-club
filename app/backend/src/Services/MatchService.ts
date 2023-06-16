import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModelType, IMatches } from '../Interfaces/MatchesMigrate';
import MatchModel from '../models/MatchModel';
import { ID } from '../Interfaces/ICRUDModel';
import { IUserModel } from '../Interfaces/UserMigrate';
import UserModel from '../models/UserModel';
import TokenGeneratorJwt from '../Utils/tokenGenerator';

export default class MatchService {
  constructor(
    private model: IMatchModelType = new MatchModel(),
    private userModel: IUserModel = new UserModel(),
    private tokenGenerator: TokenGeneratorJwt = new TokenGeneratorJwt(),
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

  public async updateMatchResult(id: ID, token: string, data: Partial<IMatches>): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.model.findById(id);

    const userInfo = this.tokenGenerator.verify(token, process.env.JWT_TOKEN || 'jwt_secret');
    const user = await this.userModel.findRole(userInfo.id);

    if (user === null) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

    await this.model.update(match.id, data);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(data: Exclude<IMatches, 'id' & 'inProgress'>): Promise<ServiceResponse<IMatches>> {
    const teamEqual = Number(data.awayTeamId) === Number(data.homeTeamId);
    const homeTeam = await this.model.findById(Number(data.homeTeamId));
    const awayTeam = await this.model.findById(Number(data.awayTeamId));
    const result = await this.model.createMatch(data);

    if(teamEqual){
      return { status: 'INVALID_DATA', data: { message: 'It is not possible to create a match with two equal teams' } }
    }

    if(!homeTeam || !awayTeam) {
      return { status: 'CONFLICT', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'SUCCESSFUL', data: result };
  }
}
