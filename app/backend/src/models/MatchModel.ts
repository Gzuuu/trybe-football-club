import SequelizeTeamModel from '../database/models/TeamModel';
import SequelizeMatchModel from '../database/models/MatchesModel';
import { IMatchModelType, IMatches } from '../Interfaces/MatchesMigrate';

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
}
