import { sequelize } from "@config/sequelize";
import { Product } from "@data/entities";
import { ProductModel } from "domain/models";
import { DestroyOptions, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class ProductRepository {
  async count() {
    const products = await Product.count();
    return products;
  }

  async getMany(take: number, skip: number) {
    const products = await Product.findAll({
      limit: take,
      offset: skip,
    });
    return products;
  }

  async getById(id: number) {
    const product = await Product.findByPk(id);
    return product;
  }

  async createOne(productData: Omit<ProductModel, "id">) {
    const newProduct = await Product.create(
      productData as Optional<Product, NullishPropertiesOf<Product>>
    );
    return newProduct;
  }

  async createMany(productData: Omit<ProductModel, "id">[]) {
    return await sequelize.transaction(async (transaction) => {
      const newProduct = await Product.bulkCreate(
        productData as Optional<Product, NullishPropertiesOf<Product>>[],
        { transaction }
      );
      return newProduct;
    });
  }

  async updateOne(id: number, productData: Partial<ProductModel>) {
    const updatedProduct = await Product.update(productData, {
      where: { id },
      returning: true,
    });
    return updatedProduct[1][0];
  }

  async deleteOne(id: number) {
    const deletedProduct = await Product.destroy({
      where: { id },
    });

    return !!deletedProduct;
  }

  async deleteMany(option: Omit<DestroyOptions<Product>, "transation">) {
    return await sequelize.transaction(async (transaction) => {
      const newProduct = await Product.destroy({
        transaction,
        ...option,
      });
      return newProduct;
    });
  }

  async deleteAll() {
    return await sequelize.transaction(async (transaction) => {
      const newProduct = await Product.destroy({
        transaction,
      });
      return !!newProduct;
    });
  }
}
