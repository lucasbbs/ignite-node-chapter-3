import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(req: Request, res: Response): Response {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );
    const all = await listSpecificationsUseCase.execute();

    return res.status(200).json(all);
  }
}

export { ListSpecificationsController };
