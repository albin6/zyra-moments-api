import { Request, Response } from "express";
import { IRefreshTokenUseCase } from "../../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenController } from "../../../entities/controllerInterfaces/auth/refresh-token-controller.inteface";
import {
  clearAuthCookies,
  updateCookieWithAccessToken,
} from "../../../shared/utils/cookieHelper";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class RefreshTokenController implements IRefreshTokenController {
  constructor(
    @inject("IRefreshTokenUseCase")
    private refreshTokenUseCase: IRefreshTokenUseCase
  ) {}
  async handle(req: Request, res: Response):Promise<void> {
    try {
      const refreshToken = (req as CustomRequest).user.refresh_token;
      const newTokens = this.refreshTokenUseCase.execute(refreshToken);
      const accessTokenName = `${newTokens.role}_access_token`;
      updateCookieWithAccessToken(res, newTokens.accessToken, accessTokenName);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS });
    } catch (error) {
      clearAuthCookies(
        res,
        `${(req as CustomRequest).user.role}_access_token`,
        `${(req as CustomRequest).user.role}_refresh_token`
      );
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
  }
}
