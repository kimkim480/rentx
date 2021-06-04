import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create({
    name,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
