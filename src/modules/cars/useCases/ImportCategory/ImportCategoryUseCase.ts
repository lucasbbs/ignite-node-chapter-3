import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from "fs";
import { parse as csvParse } from "csv-parse";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file["path"]);

      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description
          });
        })
        .on("end", () => {
          resolve(categories);
          fs.promises.unlink(file.path);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.file): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.forEach(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory)
        this.categoriesRepository.create({
          name,
          description
        });
    });
  }
}

export { ImportCategoryUseCase };
