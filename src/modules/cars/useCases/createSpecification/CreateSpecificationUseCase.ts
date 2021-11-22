import { ISpecificationsRepository } from "../../repositories/ISpecifitationsRepository";
import { Specification } from "../model/Specification";

interface IRequest {
  name: string;
  decription: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationsAlreadyExists = this.specificationsRepository.findByName(
      name
    );
    if (specificationsAlreadyExists)
      throw new Error("Specification already exists!");
    const specification = this.specificationsRepository.create({
      name,
      description
    });
    return specification;
  }
}

export { CreateSpecificationUseCase };
