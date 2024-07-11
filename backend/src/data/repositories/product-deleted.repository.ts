import { ProductDeleted } from "@data/entities";
import { ProductDeletedModel } from "domain/models";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class ProductDeletedRepository {
  async getMany(take: number, skip: number) {
    const productsDeleted = await ProductDeleted.findAll({
      limit: take,
      offset: skip,
    });
    return productsDeleted;
  }

  async createOne(productData: Omit<ProductDeletedModel, "id">) {
    const newProductDeleted = await ProductDeleted.create(
      productData as Omit<ProductDeleted, NullishPropertiesOf<ProductDeleted>>
    );
    return newProductDeleted;
  }
}
