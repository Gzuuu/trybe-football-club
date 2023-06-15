import { ID } from '../Interfaces/ICRUDModel';
import SequelizeUserModel from '../database/models/UserModel';
import { IUser, IUserModel, role } from '../Interfaces/UserMigrate';
import TokenGeneratorJwt from '../Utils/tokenGenerator';

const tokenGenerator = new TokenGeneratorJwt();

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  private async findById(id: number): Promise<IUser | null> {
    return this.model.findByPk(id);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      password: user.password,
    };
  }

  async findRole(id: ID): Promise<role | null> {
    const user = await this.findById(id);
    if(!user) return null;

    return user.role;
  }
}
