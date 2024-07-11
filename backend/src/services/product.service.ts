import { Product } from "@data/entities";
import { ProductRepository } from "@data/repositories";
import { ProductModel } from "domain/models";

export class ProductService {
  repository = new ProductRepository();

  getMany(page: number, countPerPage: number) {
    const take = +countPerPage;
    const skip = page == 1 ? 0 : (page - 1) * countPerPage;

    return this.repository.getMany(take, skip);
  }

  async getById(id: number): Promise<Product | null> {
    const product = await this.repository.getById(id);
    return product;
  }

  async create(productData: Omit<ProductModel, "id">): Promise<Product> {
    const createdProduct = await this.repository.createOne(productData);
    return createdProduct;
  }

  async update(
    id: number,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const updatedProduct = await this.repository.updateOne(id, productData);
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.repository.deleteOne(id);
    return deleted;
  }
}
