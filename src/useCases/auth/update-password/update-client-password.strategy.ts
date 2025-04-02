import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { IUpdatePasswordStrategy } from "./update-password-strategy.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";

@injectable()
export class UpdateClientPasswordStrategy implements IUpdatePasswordStrategy {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt,
  ) {}

  async update(email: string, password: string): Promise<void> {
    const isClientExists = await this.clientRepository.findByEmail(email);

    if (!isClientExists) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const hashedPassword = await this.passwordBcrypt.hash(password);

    await this.clientRepository.findByIdAndUpdatePassword(
      isClientExists._id,
      hashedPassword
    );
  }
}
