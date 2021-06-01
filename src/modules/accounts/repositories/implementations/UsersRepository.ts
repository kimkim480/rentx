import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    driver_license,
    email,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      driver_license,
      email,
      username,
    });

    await this.repository.save(user);
  }
}
