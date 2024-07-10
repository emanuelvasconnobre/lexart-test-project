import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
  @Column({
    primaryKey: true,
  })
  id!: number;

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
}

export type ProductCreationAttributes = {
  name: string;
  brand: string;
  model: string;
  price: number;
  description: string;
};
