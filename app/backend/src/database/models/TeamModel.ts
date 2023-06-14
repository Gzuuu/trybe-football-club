import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  // import OtherModel from './OtherModel';
  
  class SequelizeTeamModel extends Model<InferAttributes<SequelizeTeamModel>,
  InferCreationAttributes<SequelizeTeamModel>> {
    declare id: CreationOptional<number>;

    declare teamName: string;
  }
  
  SequelizeTeamModel.init({
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
    modelName: 'SequelizeTeamModel',
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
  
  export default SequelizeTeamModel;
  