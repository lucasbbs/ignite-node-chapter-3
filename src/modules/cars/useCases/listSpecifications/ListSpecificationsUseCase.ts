import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Specification } from "../../model/Specification";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
