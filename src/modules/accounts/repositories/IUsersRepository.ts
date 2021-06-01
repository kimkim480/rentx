import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create({
    name,
    password,
    driver_license,
    email,
    username,
  }: ICreateUserDTO): Promise<void>;
}
