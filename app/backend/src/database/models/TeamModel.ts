import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  // import OtherModel from './OtherModel';
  
  class TeamModel extends Model<InferAttributes<TeamModel>,
  InferCreationAttributes<TeamModel>> {
    declare id: CreationOptional<number>;

    declare teamName: string;
  }
  
  TeamModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
  }, {
    sequelize: db,
    modelName: 'TeamModel',
    timestamps: false,
    tableName: 'team',
    underscored: true,
  });
  
  /**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */
  
  // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
  // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
  
  // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
  // Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
  
  export default TeamModel;
  