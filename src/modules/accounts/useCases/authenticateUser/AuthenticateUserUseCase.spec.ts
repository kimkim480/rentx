import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an existing user", async () => {
    const user: ICreateUserDTO = {
      name: "user test",
      password: "123456",
      email: "user@example.com",
      driver_license: "000123456",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate an inexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@example.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("User or password incorrect!"));
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "user test",
      password: "123456",
      email: "user@example.com",
      driver_license: "000123456",
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "1234",
      })
    ).rejects.toEqual(new AppError("User or password incorrect!"));
  });
});
