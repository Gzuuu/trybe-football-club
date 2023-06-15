import { IUser } from './UserMigrate';

export type tokenPayload = {
  id: number;
}

export interface TokenGenerator {
  generate(user: IUser): string;
  verify(token: string, secret: string): tokenPayload;
}
