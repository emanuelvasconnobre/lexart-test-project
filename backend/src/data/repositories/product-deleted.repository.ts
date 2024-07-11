import { ProductDeleted } from "@data/entities";

export class ProductDeletedRepository {
  async getMany(take: number, skip: number) {
    const productsDeleted = await ProductDeleted.findAll({
      limit: take,
      offset: skip,
    });
    return productsDeleted;
  }

  async createOne(
    productData: Omit<ProductDeleted, "id">
  ) {
    const newProductDeleted = await ProductDeleted.create(productData);
    return newProductDeleted;
  }
}
