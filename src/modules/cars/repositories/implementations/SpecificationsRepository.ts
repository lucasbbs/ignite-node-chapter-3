import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
    return specification;
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationsRepository };
