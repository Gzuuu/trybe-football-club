import { ID } from '../Interfaces/ICRUDModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam, ITeamModel } from '../Interfaces/TeamMigrates';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ID): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);

    return { status: 'SUCCESSFUL', data: team }
  }
}
