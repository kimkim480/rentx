import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot email to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      name: "Name",
      email: "example@example.com",
      password: "123456",
      driver_license: "aaa123",
    });

    await sendForgotPasswordMailUseCase.execute("example@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email to an nonexistent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("email@emai.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      name: "Name 2",
      email: "email@example.com",
      password: "123456",
      driver_license: "1aaa123",
    });

    await sendForgotPasswordMailUseCase.execute("email@example.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
