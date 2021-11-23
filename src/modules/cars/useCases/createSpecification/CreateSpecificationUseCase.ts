import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository.ts';
import { Specification } from '../model/Specification';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  decription: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationsAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationsAlreadyExists)
      throw new Error('Specification already exists!');
    const specification = await this.specificationsRepository.create({
      name,
      description,
    });
    return specification;
  }
}

export { CreateSpecificationUseCase };
