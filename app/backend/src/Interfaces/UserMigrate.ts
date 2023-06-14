import { ID } from "./ICRUDModel";

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUserModel<T> {
  findById(id: ID): Promise<T | null>,
} 
