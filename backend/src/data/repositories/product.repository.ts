import { Product } from "@data/entities";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class ProductRepository {
  async getMany(take: number, skip: number) {
    const products = await Product.findAll({
      limit: take,
      offset: skip,
    });
    return products;
  }

  async getOne(id: number) {
    const product = await Product.findByPk(id);
    return product;
  }

  async createOne(
    productData: Optional<Product, NullishPropertiesOf<Product>>
  ) {
    const newProduct = await Product.create(productData);
    return newProduct;
  }

  async updateOne(id: number, productData: Partial<Product>) {
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
}