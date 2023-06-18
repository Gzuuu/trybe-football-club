import SequelizeTeamModel from '../database/models/TeamModel';
import SequelizeMatchModel from '../database/models/MatchesModel';
import { IMatchModelType, IMatches, IMatchesModel } from '../Interfaces/MatchesMigrate';

export default class MatchModel implements IMatchModelType {
  private model = SequelizeMatchModel;
  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll({ include:
            [{ model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
              { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }] });

    return data;
  }

  async findById(id: number): Promise<IMatches | null> {
    const data = await this.model.findOne({ where: { id },
      include:
            [{ model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
              { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }] });

    return data;
  }

  async findInProgress(bool: boolean): Promise<IMatchesModel[]> {
    const data = await this.model.findAll({ include:
      [{ model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    where: { inProgress: bool } });

    return data as unknown as IMatchesModel[];
  }

  async update(id: number, data: Partial<IMatches>): Promise<IMatches | null> {
    await this.model.update({ ...data }, { where: { id } });

    const updatedMatch = this.findById(id);

    return updatedMatch;
  }

  async createMatch(data: Exclude<IMatches, 'id' | 'inProgress'>): Promise<IMatches> {
    const result = await this.model.create({ ...data, inProgress: true });

    return result;
  }
}
