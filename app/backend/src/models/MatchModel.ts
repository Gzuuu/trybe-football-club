import SequelizeTeamModel from "../database/models/TeamModel";
import SequelizeMatchModel from "../database/models/MatchesModel";
import { IMatchesModel, IMatchModelType, IMatches } from "../Interfaces/MatchesMigrate";


export default class MatchModel implements IMatchModelType {
    private model = SequelizeMatchModel;
    async findAll(): Promise<IMatches[]> {
        const data = await this.model.findAll({ include:
            [{ model: SequelizeTeamModel, as: 'homeTeam'}, { model: SequelizeTeamModel, as: 'awayTeam'}]});

        return data;
    }

    async findById(id: number): Promise<IMatches | null> {
        const data = await this.model.findOne({ where: { id }, include:
            [{ model: SequelizeTeamModel, as: 'homeTeam'}, { model: SequelizeTeamModel, as: 'awayTeam'}]});

            return data;
    }
}