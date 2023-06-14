import EncrypterBcryptService from '../Utils/EncrypterBcrypt';
import { ID } from '../Interfaces/ICRUDModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser, IUserModel } from '../Interfaces/UserMigrate';
import UserModel from '../models/UserModel';
import TokenGeneratorJwt from '../Utils/tokenGenerator';

const encrypter = new EncrypterBcryptService();
const generateToken = new TokenGeneratorJwt();

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  private async getUserById(id: ID): Promise<ServiceResponse<IUser | null>> {
    const user = await this.userModel.findById(id);
     if (!user) return { status: 'NOT_FOUND', data: { message: 'Invalid email or password '} }

     return { status: 'SUCCESSFUL', data: user }
    }
}
