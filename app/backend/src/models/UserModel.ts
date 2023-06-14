import SequelizeUserModel from '../database/models/UserModel';
import { IUser, IUserModel } from '../Interfaces/UserMigrate';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  public async findById(id: number): Promise<IUser | null> {
    return await this.model.findByPk(id);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where : { email }});

    if(!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      password: user.password,
    }
  }
}
