import { Specification } from "../model/Specification";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): Specification;
  list(): Specification[];
  findByName(name: string): Boolean;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };
