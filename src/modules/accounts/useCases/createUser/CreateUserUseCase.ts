import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    driver_license,
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      driver_license,
      email,
      password: passwordHash,
      name,
    });
  }
}
