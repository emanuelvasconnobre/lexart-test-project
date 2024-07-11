import { Product } from "@data/entities";

export class ProductRepository {
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

  async createOne(
    productData: Omit<Product, "id">
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
