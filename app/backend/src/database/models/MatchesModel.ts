import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

import SequelizeTeamModel from './TeamModel';

type HomeAwayTeam = {
  id?: number,
  teamName: string,
};

class SequelizeMatchModel extends Model<InferAttributes<SequelizeMatchModel>,
InferCreationAttributes<SequelizeMatchModel>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;

  declare homeTeam: NonAttribute<HomeAwayTeam>;

  declare awayTeam: NonAttribute<HomeAwayTeam>;
}

SequelizeMatchModel.init({
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
  tableName: 'matches',
});

SequelizeMatchModel.belongsTo(SequelizeTeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatchModel.belongsTo(SequelizeTeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default SequelizeMatchModel;
