import { ProductDeleted } from "@modules/data/entities";
import { ProductDeletedRepository } from "@modules/data/repositories";
import { ProductDeletedModel } from "@modules/domain/models";

export class LogService {
  repository = new ProductDeletedRepository();

  count() {
    return this.repository.count();
  }

  getMany(page: number, countPerPage: number) {
    const take = +countPerPage;
    const skip = page == 1 ? 0 : (page - 1) * countPerPage;

    return this.repository.getMany(take, skip);
  }

  async create(productData: Omit<ProductDeletedModel, "id">): Promise<ProductDeleted> {
    const createdObject = await this.repository.createOne(productData);
    return createdObject;
  }
}
