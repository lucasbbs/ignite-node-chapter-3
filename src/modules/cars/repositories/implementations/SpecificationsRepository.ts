import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ description, name }: ICreateSpecificationsDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specifications.push(specification);

    return specification;
  }
  list(): Specification[] {
    return this.specifications;
  }
  findByName(name: string): Boolean {
    return this.specifications.some(
      (specification) => specification.name === name
    );
  }
}

export { SpecificationsRepository };
