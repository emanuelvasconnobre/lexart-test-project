import { sequelize } from "@modules/config/sequelize";
import { Product } from "@modules/data/entities";
import { ProductModel } from "@modules/domain/models";
import { UnexpectedException } from "@modules/exceptions/app-exceptions";
import { DestroyOptions, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class ProductRepository {
  async count() {
    try {
      const products = await Product.count();
      return products;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error counting products`,
        traceback: error.message,
      });
    }
  }

  async getMany(take: number, skip: number) {
    try {
      const products = await Product.findAll({
        limit: take,
        offset: skip,
      });
      return products;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching many products`,
        traceback: error.message,
      });
    }
  }

  async getById(id: number) {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching product by ID`,
        traceback: error.message,
      });
    }
  }

  async createOne(productData: Omit<ProductModel, "id">) {
    try {
      const newProduct = await Product.create(
        productData as Optional<Product, NullishPropertiesOf<Product>>
      );
      return newProduct;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error creating product`,
        traceback: error.message,
      });
    }
  }

  async createMany(productData: Omit<ProductModel, "id">[]) {
    try {
      return await sequelize.transaction(async (transaction) => {
        const newProducts = await Product.bulkCreate(
          productData as Optional<Product, NullishPropertiesOf<Product>>[],
          { transaction }
        );
        return newProducts;
      });
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error creating many products`,
        traceback: error.message,
      });
    }
  }

  async updateOne(id: number, productData: Partial<ProductModel>) {
    try {
      const updatedProduct = await Product.update(productData, {
        where: { id },
        returning: true,
      });
      return updatedProduct[1][0];
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error updating product`,
        traceback: error.message,
      });
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedProduct = await Product.destroy({
        where: { id },
      });

      return !!deletedProduct;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting product`,
        traceback: error.message,
      });
    }
  }

  async deleteMany(option: Omit<DestroyOptions<Product>, "transation">) {
    try {
      return await sequelize.transaction(async (transaction) => {
        const deletedProductsCount = await Product.destroy({
          transaction,
          ...option,
        });
        return deletedProductsCount;
      });
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting many products`,
        traceback: error.message,
      });
    }
  }

  async deleteAll() {
    try {
      return await sequelize.transaction(async (transaction) => {
        const deletedProductsCount = await Product.destroy({
          transaction,
        });
        return !!deletedProductsCount;
      });
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting all products`,
        traceback: error.message,
      });
    }
  }
}
