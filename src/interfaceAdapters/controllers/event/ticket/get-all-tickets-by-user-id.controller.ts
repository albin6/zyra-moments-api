import { Request, Response } from "express";
import { IGetAllTicketsByUserIdController } from "../../../../entities/controllerInterfaces/event/ticket/get-all-tickets-by-user-id-controller.interface";
import { IGetAllTicketsByUserIdUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/get-all-tickets-by-user-id-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";
import { CustomRequest } from "../../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllTicketsByUserIdController
  implements IGetAllTicketsByUserIdController
{
  constructor(
    @inject("IGetAllTicketsByUserIdUseCase")
    private getAllTicketsByUserIdUseCase: IGetAllTicketsByUserIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const userId = (req as CustomRequest).user.id;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const { tickets, total } = await this.getAllTicketsByUserIdUseCase.execute(
      userId,
      pageNumber,
      pageSize
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      tickets,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
