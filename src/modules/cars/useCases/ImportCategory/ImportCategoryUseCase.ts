import { inject, injectable } from 'tsyringe';

import fs from 'fs';
import { parse as csvParse } from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file['path']);

      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
          fs.promises.unlink(file.path);
        })
        .on('error', (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.file): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.forEach(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory)
        await this.categoriesRepository.create({
          name,
          description,
        });
    });
  }
}

export { ImportCategoryUseCase };
