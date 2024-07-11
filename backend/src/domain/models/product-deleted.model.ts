export class ProductDeletedModel {
  id?: number;
  productId!: number;
  name!: string;
  brand!: string;
  model!: string;
  price!: number;
  description!: string;
  deletedAt!: Date;
  username!: string;
  userId!: string;
}
