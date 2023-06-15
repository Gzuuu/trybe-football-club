import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/UserMigrate';
import { TokenGenerator, tokenPayload } from '../Interfaces/TokenGenerator';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, 'SECRET');
    return token;
  }

  verify(token: string, secret: string): tokenPayload {
    const user = this.jwt.verify(token, secret) as tokenPayload;
    return user;
  }
}
