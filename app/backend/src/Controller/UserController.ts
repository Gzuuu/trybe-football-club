import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from '../Utils/EncrypterBcrypt';
import TokenGeneratorJwt from '../Utils/tokenGenerator';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();

export default class UserController {
  constructor(
    private userService = new UserService(userModel, encrypter, tokenGenerator),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async findRole(req: Request, res: Response) {
    const token = String(req.headers.authorization);

    const serviceResponse = await this.userService.findRole(token);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
