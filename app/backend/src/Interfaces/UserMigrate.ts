import { ID } from './ICRUDModel';

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface UserReader<T> {
  findByEmail(email: string): Promise<T | null>
  findRole(id: ID): Promise<Partial<T> | null>
}

export type IUserModel = UserReader<IUser>;
