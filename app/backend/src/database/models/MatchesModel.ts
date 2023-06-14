import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

import TeamModel from './TeamModel';

class MatchModel extends Model<InferAttributes<MatchModel>,
InferCreationAttributes<MatchModel>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'MatchModel',
  timestamps: false,
  underscored: true,
});

TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'Hteam' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'Ateam' });

MatchModel.hasMany(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchModel.hasMany(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default MatchModel;
