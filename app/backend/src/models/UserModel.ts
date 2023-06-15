import SequelizeUserModel from '../database/models/UserModel';
import { IUser, IUserModel, role } from '../Interfaces/UserMigrate';
import TokenGeneratorJwt from '../Utils/tokenGenerator';

const tokenGenerator = new TokenGeneratorJwt();

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  public async findById(id: number): Promise<IUser | null> {
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

  async findRole(token: string): Promise<role | null> {
    const userInfo = tokenGenerator.verify(token, process.env.JWT_SECRET || 'SECRET');

    if(!userInfo.id) return null;

    const user = await this.findById(userInfo.id);

    if(!user) return null;

    return user.role;
  }
}
