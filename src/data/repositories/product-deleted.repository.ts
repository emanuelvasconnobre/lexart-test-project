import { ProductDeleted } from "@modules/data/entities";
import { ProductDeletedModel } from "@modules/domain/models";
import { UnexpectedException } from "@modules/exceptions/app-exceptions";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class ProductDeletedRepository {
  async count() {
    try {
      const count = await ProductDeleted.count();
      return count;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error counting all products`,
        traceback: error.message,
      });
    }
  }

  async getMany(take: number, skip: number) {
    try {
      const productsDeleted = await ProductDeleted.findAll({
        limit: take,
        offset: skip,
      });
      return productsDeleted;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting all products`,
        traceback: error.message,
      });
    }
  }

  async createOne(productData: Omit<ProductDeletedModel, "id">) {
    try {
      const newProductDeleted = await ProductDeleted.create(
        productData as Omit<ProductDeleted, NullishPropertiesOf<ProductDeleted>>
      );
      return newProductDeleted;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting all products`,
        traceback: error.message,
      });
    }
  }
}
