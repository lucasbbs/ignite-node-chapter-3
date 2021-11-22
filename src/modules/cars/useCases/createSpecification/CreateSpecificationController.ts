import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

import { Request, Response } from "express";
class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const specification = this.createSpecificationUseCase.execute({
      name,
      description
    });
    return res.status(201).json(specification);
  }
}

export { CreateSpecificationController };
