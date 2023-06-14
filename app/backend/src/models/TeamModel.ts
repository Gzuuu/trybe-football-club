import SequelizeTeamModel from '../database/models/TeamModel';
import { ITeam, ITeamModel } from '../Interfaces/TeamMigrates';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();

    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
      return this.model.findByPk(id);
  }
}
