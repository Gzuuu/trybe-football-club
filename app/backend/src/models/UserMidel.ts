import SequelizeUserModel from '../database/models/UserModel';
import { IUser, IUserModel } from '../Interfaces/UserMigrate';

export default class UserModel implements IUserModel<IUser> {
  private model = SequelizeUserModel;

  public async findById(id: number): Promise<IUser | null> {
    return await this.model.findByPk(id);
  }
}
