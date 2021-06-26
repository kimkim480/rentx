import { IMailProvider } from "../IMailProvider";

export class MailProviderInMemory implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    console.log(to, subject, variables, path);
  }
}
