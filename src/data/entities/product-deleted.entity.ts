import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  initialAutoIncrement: "1",
  tableName: "products_deleted",
  createdAt: true,
  name: {
    plural: "products_deleted",
    singular: "product_deleted",
  },
})
export class ProductDeleted extends Model<ProductDeleted> {
  @Column({
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    allowNull: false,
    field: "product_id",
  })
  productId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "deleted_at",
  })
  deletedAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "user_id",
  })
  userId!: string;
}
