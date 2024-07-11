import { ProductDeleted } from "@data/entities";
import { ProductDeletedRepository } from "@data/repositories";

export class LogService {
  repository = new ProductDeletedRepository();

  getMany(page: number, countPerPage: number) {
    const take = +countPerPage;
    const skip = page == 1 ? 0 : (page - 1) * countPerPage;

    return this.repository.getMany(take, skip);
  }

  async create(productData: Omit<ProductDeleted, "id">): Promise<ProductDeleted> {
    const createdObject = await this.repository.createOne(productData);
    return createdObject;
  }
}
