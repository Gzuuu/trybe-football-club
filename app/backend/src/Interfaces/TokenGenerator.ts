import { IUser } from './UserMigrate';

export interface TokenGenerator {
  generate(user: IUser): string
}
