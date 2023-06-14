import { ID } from "./ICRUDModel";

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface UserReader<T> {
  findById(id: ID): Promise<T | null>,
  findByEmail(email: string): Promise<T | null>
} 

export type IUserModel = UserReader<IUser>;