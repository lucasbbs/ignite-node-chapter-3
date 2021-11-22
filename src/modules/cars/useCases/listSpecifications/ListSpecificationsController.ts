import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handle(req: Request, res: Response): Response {
    const all = this.listSpecificationsUseCase.execute();

    return res.status(200).json(all);
  }
}

export { ListSpecificationsController };
